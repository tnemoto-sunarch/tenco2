<template>
  <div class="q-pa-md">
    <q-table
      dense
      :grid="$q.screen.xs"
      title="ユーザー一覧"
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
                  <q-item clickable v-close-popup :to="'/manage/users/' + props.row.id">
                    <q-item-section avatar>
                      <q-icon name="edit" />
                    </q-item-section>
                    <q-item-section>編集</q-item-section>
                  </q-item>
                  <q-item clickable v-close-popup @click="deleteUser(props.row.id, props.row.name)">
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
            <q-btn rounded color="primary" icon="edit" label="編集" :to="'/manage/users/' + props.row.id"/>
            <q-btn rounded color="red" icon="delete" label="削除" @click="deleteUser(props.row.id, props.row.name)"/>
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
const typeOptions = [
  {label: "一般", value: '0'},
  {label: "リーダー", value: '1'},
  {label: "管理者", value: '2'}
]
const displayType = (status) => {
  return typeOptions[status].label
}
const statusOptions = [
  {label: "無効", value: '0'},
  {label: "有効", value: '1'}
]
const displayStatus = (status) => {
  return statusOptions[status].label
}
const columns = [
  {name: 'id', required: true, label: 'ID', align: 'left', field: row => row.id, sortable: true},
  {name: 'name', required: false, label: '名称', align: 'left', field: row => row.name, sortable: true},
  {name: 'type', required: false, label: 'ユーザー種別', align: 'left', field: row => row.type, format: val => displayType(val), sortable: true},
  {name: 'status', required: false, label: 'ステータス', align: 'left', field: row => row.status, format: val => displayStatus(val), sortable: true},
  {name: 'last_access_date', required: false, label: '最終アクセス日時', align: 'right', field: row => row.last_access_date, sortable: true},
]

function updateUser(id, name){
  editDialog.value.name = null
  editDialog.value.status = '1'
  editDialog.value.order_num = rows.value.reduce((prev, current) => prev.order_num > current.order_num ? prev : current).order_num + 1
  editDialog.value.display = true
  editDialog.value.next = async () => {
    // API呼び出し
    // リロード
    reload()
  }
}
function deleteUser(id, name) {
  dialog.value.icon = "error"
  dialog.value.iconColor = "red"
  dialog.value.message = 
    "以下のログインユーザーを削除します。\nよろしいですか？\n"
  + "ID  : " + id + "\n"
  + "名称: " + name;
  dialog.value.display = true
  dialog.value.next = async () => {
    // API呼び出し
    const res = await $fetch("/api/users/" + id, {
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
  const data = await $fetch('/api/users/list')
  rows.value = data
}

onMounted(() => {
  reload()
})
</script>

<style lang="css" scoped>
</style>