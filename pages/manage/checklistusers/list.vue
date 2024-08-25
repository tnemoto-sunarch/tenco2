<template>
  <div class="q-pa-md">
    <q-table
      dense
      title="チェックシート登録ユーザー一覧"
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
        <q-btn square color="primary" icon="add_circle" @click="addChecklistUser()"/>
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
                  <q-item clickable v-close-popup :to="'/manage/checklistusers/' + props.row.id">
                    <q-item-section avatar>
                      <q-icon name="edit" />
                    </q-item-section>
                    <q-item-section>編集</q-item-section>
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
    </q-table>
  </div>
  <q-dialog v-model="editDialog.display" persistent>
    <q-card>
      <q-card-section class="items-center">
        <div class="text-h8">登録ユーザー追加</div>
      </q-card-section>
      <q-card-section class="items-center">
        <q-input color="blue" filled v-model="editDialog.name" label="名前">
          <template v-slot:prepend>
            <q-icon name="edit" />
          </template>
        </q-input>
        <q-select 
          label="ステータス"
          emit-value
          map-options 
          outlined 
          v-model="editDialog.status" 
          :options="options" >
          <template v-slot:prepend>
            <q-icon name="edit" />
          </template>
        </q-select>
        <q-input color="blue" filled v-model="editDialog.order_num" label="並び順">
          <template v-slot:prepend>
            <q-icon name="edit" />
          </template>
        </q-input>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="更新" color="primary" v-close-popup @click="editDialog.next()"/>
        <q-btn flat label="Cancel" color="gray" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
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
const filter = ref("")
const rows = ref([])
const pagination = {
  rowsPerPage: 15
}
const editDialog = ref({
  display: false,
  name: null,
  status: '1',
  order_num: 1,
  next: function(){return null;}
})
const dialog = ref({
  display: false,
  icon: "info",
  iconColor: "blue",
  message: "",
  next: function(){return null;}
})
const options = [
  {label: "無効", value: '0'},
  {label: "有効", value: '1'}
]
const displayStatus = (status) => {
  return options[status].label
}
const columns = [
  {name: 'id', required: true, label: 'ID', align: 'left', field: row => row.id, sortable: true},
  {name: 'name', required: false, label: '名称', align: 'left', field: row => row.name, sortable: true},
  {name: 'status', required: false, label: 'ステータス', align: 'left', field: row => row.status, format: val => displayStatus(val), sortable: true},
  {name: 'order_num', required: false, label: '並び順', align: 'right', field: row => row.order_num, sortable: true},
]

function addChecklistUser(){
  editDialog.value.name = null
  editDialog.value.status = '1'
  editDialog.value.order_num = rows.value.reduce((prev, current) => prev.order_num > current.order_num ? prev : current).order_num + 1
  editDialog.value.display = true
  editDialog.value.next = async () => {
    // API呼び出し
    const res = await $fetch("/api/checklistregusers/add", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: {
        request: {
          authId: auth.userId,
          authName: auth.userName
        },
        data: {
          name: editDialog.value.name,
          status: editDialog.value.status,
          order_num: editDialog.value.order_num
        }
      }
    })
    // リロード
    reload()
  }
}
function deleteChecklist(id, name) {
  dialog.value.icon = "error"
  dialog.value.iconColor = "red"
  dialog.value.message = 
    "以下の登録ユーザーを削除します。\nよろしいですか？\n"
  + "ID  : " + id + "\n"
  + "名称: " + name;
  dialog.value.display = true
  dialog.value.next = async () => {
    // API呼び出し
    const res = await $fetch("/api/checklistregusers/" + id, {
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
  }
}

async function reload(){
  const data = await $fetch('/api/checklistregusers/list')
  rows.value = data
}

onMounted(() => {
  reload()
})
</script>

<style lang="css" scoped>
</style>