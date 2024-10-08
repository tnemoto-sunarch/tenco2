<template>
  <div class="q-pa-md">
    <q-table
      dense
      :grid="$q.screen.xs"
      title="チェックシート一覧"
      :rows="rows"
      :columns="columns"
      row-key="id"
      :filter="filter"
      :pagination="pagination"
    >
      <template v-slot:top-right>
        <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
      <template v-slot:header="props">
        <q-tr :props="props">
          <q-th auto-width />
          <q-th
            v-for="col in props.cols"
            :key="col.name"
            :props="props"
          >
            {{ col.label }}
          </q-th>
        </q-tr>
      </template>      
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td auto-width>
            <q-btn size="sm" color="primary" round dense icon="settings">
              <q-menu
                anchor="top right"
                self="top left"
              >
                <q-list dense style="min-width: 90px">
                  <q-item clickable v-close-popup :to="'/manage/checklist/' + props.row.id">
                    <q-item-section avatar>
                      <q-icon name="edit" />
                    </q-item-section>
                    <q-item-section>詳細</q-item-section>
                  </q-item>
                  <q-item 
                    :clickable="props.row.status == '2' ? true : false" 
                    :class="props.row.status == '2' ? '' : 'disabled'"
                    v-close-popup 
                    @click="reopenChecklist(props.row.id, props.row.name)">
                    <q-item-section avatar>
                      <q-icon name="update" />
                    </q-item-section>
                    <q-item-section>再開</q-item-section>
                  </q-item>
                  <q-item clickable v-close-popup @click="initChecklist(props.row.id, props.row.name)">
                    <q-item-section avatar>
                      <q-icon name="delete" />
                    </q-item-section>
                    <q-item-section>初期化</q-item-section>
                  </q-item>
                  <q-item clickable v-close-popup @click="deleteChecklist(props.row.id, props.row.name)">
                    <q-item-section avatar>
                      <q-icon name="delete_forever" />
                    </q-item-section>
                    <q-item-section>削除</q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
          </q-td>
          <q-td
            v-for="col in props.cols"
            :key="col.name"
            :props="props"
          >
            {{ col.value }}
          </q-td>
        </q-tr>
      </template>
      <template v-slot:item="props">
        <div class="q-pa-xs col-xs-12">
          <q-card bordered flat>
          <q-card-section>
            <q-list dense>
              <q-item v-for="col in props.cols.filter(col => col.name !== 'desc')" :key="col.name">
                <q-item-section>
                  <q-item-label caption>{{ col.label }}</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-item-label>{{ col.value }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn rounded color="primary" icon="edit" label="詳細" :to="'/manage/checklist/' + props.row.id"/>
            <q-btn rounded color="primary" icon="update" label="再開" 
              :disable="props.row.status == '2' ? false : true" 
              :class="props.row.status == '2' ? '' : 'disabled'"
              @click="reopenChecklist(props.row.id, props.row.name)"/>
            <q-btn rounded color="primary" icon="delete" label="初期化"
              @click="initChecklist(props.row.id, props.row.name)"/>
            <q-btn rounded color="red" icon="delete_forever" label="削除"
              @click="deleteChecklist(props.row.id, props.row.name)"/>
          </q-card-actions>
        </q-card>
        </div>
      </template>
    </q-table>
  </div>
  <q-dialog v-model="dialog.display" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <q-avatar size="50px" :icon="dialog.icon" :text-color="dialog.iconColor" />
        <div class="q-ml-sm" style="white-space: pre-wrap;">{{ dialog.message }}</div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="OK" color="primary" v-close-popup @click="dialog.next()"/>
        <q-btn flat label="Cancel" color="gray" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
const auth = useAuthStore()
const checklistMenu = useChecklistStore()
const filter = ref("")
const columns = [
  {name: 'id', required: true, label: 'ID', align: 'left', field: row => row.id, sortable: true},
  {name: 'name', required: false, label: '名称', align: 'left', field: row => row.name, sortable: true},
  {name: 'status', required: false, label: 'ステータス', align: 'left', field: row => row.status, format: val => displayStatus(val), sortable: true},
  {name: 'open_count', required: false, label: '開始回数', align: 'right', field: row => row.open_count, sortable: true},
  {name: 'open_date', required: false, label: '開始日時', align: 'left', field: row => row.open_date, sortable: true},
  {name: 'close_date', required: false, label: '完了日時', align: 'left', field: row => row.close_date, sortable: true},
  {name: 'order_num', required: false, label: '並び順', align: 'right', field: row => row.order_num, sortable: true}
]
const rows = ref([])
const dialog = ref({
  display: false,
  icon: "info",
  iconColor: "blue",
  message: "",
  next: function(){return null;}
})
const pagination = {
  rowsPerPage: 15
}
async function reload() {
  const data = await $fetch('/api/checklist/list')
  rows.value = data
}

function reopenChecklist(id, name) {
  dialog.value.icon = "warning"
  dialog.value.iconColor = "orange"
  dialog.value.message = 
    "以下のチェックシートを再開します。\nよろしいですか？\n"
  + "ID  : " + id + "\n"
  + "名称: " + name;
  dialog.value.display = true
  dialog.value.next = async () => {
    //API呼び出し
    const res = await $fetch("/api/checklist/" + id + "/reopen", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: {
        request: {
          authId: auth.userId,
          authName: auth.userName
        },
        data: {
        }
      }
    })
    // reload
    reload()
    checklistMenu.load()
  }
}

function initChecklist(id, name) {
  dialog.value.icon = "warning"
  dialog.value.iconColor = "orange"
  dialog.value.message = 
    "以下のチェックシートを初期化します。\nよろしいですか？\n"
  + "ID  : " + id + "\n"
  + "名称: " + name;
  dialog.value.display = true
  dialog.value.next = async () => {
    //API呼び出し
    const res = await $fetch("/api/checklist/" + id + "/init", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: {
        request: {
          authId: auth.userId,
          authName: auth.userName
        },
        data: {
        }
      }
    })
    // reload
    reload()
    checklistMenu.load()
  }
}

function deleteChecklist(id, name) {
  dialog.value.icon = "error"
  dialog.value.iconColor = "red"
  dialog.value.message = 
    "以下のチェックシートを削除します。\nよろしいですか？\n"
  + "ID  : " + id + "\n"
  + "名称: " + name;
  dialog.value.display = true
  dialog.value.next = async () => {
    //API呼び出し
    const res = await $fetch("/api/checklist/" + id, {
      method: "DELETE",
      headers: {"Content-Type": "application/json"},
      body: {
        request: {
          authId: auth.userId,
          authName: auth.userName
        },
        data: {
        }
      }
    })
    // reload
    reload()
    checklistMenu.load()
  }
}

function displayStatus(status) {
  switch(status) {
    case '0':
      return "開始前"
    case '1':
      return "チェック中"
    case '2':
      return "完了"
  }
}

onMounted(() => {
  reload()
})
</script>

<style lang="css" scoped>
.disabled {
  background-color: #dddddd;
}
</style>