<template>
  <div class="q-pa-md">
    <q-layout view="lHh lpr lFf" container style="height: 800px" class="shadow-2 rounded-borders">
      <q-header elevated>
        <q-bar class="bg-blue text-white ">
          <div>{{ page_id }}</div>
          <q-space />
          <q-btn label="更新&nbsp" glossy icon="edit" class="bg-black" color="white" style="width: 80px"
            @click="update()"/>
        </q-bar>
        <q-bar class="bg-blue text-white">
          <q-space />
          <q-tabs v-model="tab" shrink stretch>
            <q-tab name="tab1" label="基本" />
            <q-tab name="tab2" :label="'対象(' + checkusers.length + ')'" />
          </q-tabs>
        </q-bar>
      </q-header>
      <q-page-container>
        <q-page class="q-pa-md">
          <q-tab-panels v-model="tab" animated>
            <q-tab-panel name="tab1">
              <q-field color="black" filled label="ID" stack-label>
                <template v-slot:prepend>
                  <q-icon name="edit_off" />
                </template>
                <template v-slot:control>
                  <div class="self-center full-width no-outline" tabindex="0">{{ data.id }}</div>
                </template>
              </q-field>
              <q-input color="blue" filled v-model="data.name" label="チェックシート名">
                <template v-slot:prepend>
                  <q-icon name="edit" />
                </template>
              </q-input>
              <q-select 
                label="ステータス"
                emit-value
                map-options 
                outlined 
                v-model="data.status" 
                :options="checklist_status_options" >
                <template v-slot:prepend>
                  <q-icon name="edit" />
                </template>
              </q-select>
              <q-input color="blue" filled v-model="data.order_num" label="並び順">
                <template v-slot:prepend>
                  <q-icon name="edit" />
                </template>
              </q-input>
              <q-field color="black" filled label="開始回数" stack-label>
                <template v-slot:prepend>
                  <q-icon name="edit_off" />
                </template>
                <template v-slot:control>
                  <div class="self-center full-width no-outline" tabindex="0">{{ data.open_count }}</div>
                </template>
              </q-field>
              <q-field color="black" filled label="開始日時" stack-label>
                <template v-slot:prepend>
                  <q-icon name="edit_off" />
                </template>
                <template v-slot:control>
                  <div class="self-center full-width no-outline" tabindex="0">{{ data.open_date }}</div>
                </template>
              </q-field>
              <q-field color="black" filled label="完了日時" stack-label>
                <template v-slot:prepend>
                  <q-icon name="edit_off" />
                </template>
                <template v-slot:control>
                  <div class="self-center full-width no-outline" tabindex="0">{{ data.close_date }}</div>
                </template>
              </q-field>
              <q-field color="black" filled label="作成日時" stack-label>
                <template v-slot:prepend>
                  <q-icon name="edit_off" />
                </template>
                <template v-slot:control>
                  <div class="self-center full-width no-outline" tabindex="0">{{ data.create_date }}</div>
                </template>
              </q-field>
              <q-field color="black" filled label="作成者ID" stack-label>
                <template v-slot:prepend>
                  <q-icon name="edit_off" />
                </template>
                <template v-slot:control>
                  <div class="self-center full-width no-outline" tabindex="0">{{ data.create_user_id }}</div>
                </template>
              </q-field>
              <q-field color="black" filled label="作成者名" stack-label>
                <template v-slot:prepend>
                  <q-icon name="edit_off" />
                </template>
                <template v-slot:control>
                  <div class="self-center full-width no-outline" tabindex="0">{{ data.create_user_name }}</div>
                </template>
              </q-field>
              <q-field color="black" filled label="更新日時" stack-label>
                <template v-slot:prepend>
                  <q-icon name="edit_off" />
                </template>
                <template v-slot:control>
                  <div class="self-center full-width no-outline" tabindex="0">{{ data.update_date }}</div>
                </template>
              </q-field>
              <q-field color="black" filled label="更新者ID" stack-label>
                <template v-slot:prepend>
                  <q-icon name="edit_off" />
                </template>
                <template v-slot:control>
                  <div class="self-center full-width no-outline" tabindex="0">{{ data.update_user_id }}</div>
                </template>
              </q-field>
              <q-field color="black" filled label="更新者名" stack-label>
                <template v-slot:prepend>
                  <q-icon name="edit_off" />
                </template>
                <template v-slot:control>
                  <div class="self-center full-width no-outline" tabindex="0">{{ data.update_user_name }}</div>
                </template>
              </q-field>
            </q-tab-panel>
            <q-tab-panel name="tab2">
              <q-table
                dense
                :grid="$q.screen.xs"
                title="チェック対象一覧"
                :rows="checkusers"
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
                            <q-item v-close-popup class="disabled">
                              <q-item-section avatar>
                                <q-icon name="edit" />
                              </q-item-section>
                              <q-item-section>編集</q-item-section>
                            </q-item>
                            <q-item clickable v-close-popup @click="deleteChecklistUser(props.row.id, props.row.name)">
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
                      <q-btn rounded color="primary" icon="edit" label="編集"/>
                      <q-btn rounded color="red" icon="delete_forever" label="削除" @click="deleteChecklistUser(props.row.id, props.row.name)"/>
                    </q-card-actions>
                  </q-card>
                  </div>
                </template>
              </q-table>
            </q-tab-panel>
          </q-tab-panels>
        </q-page>
      </q-page-container>
    </q-layout>
  </div>
  <q-dialog v-model="editDialog.display" persistent>
    <q-card>
      <q-card-section class="items-center">
        <div class="text-h8">対象追加</div>
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
          :options="checklist_item_status_options" >
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
        <q-btn flat label="追加" color="primary" v-close-popup @click="editDialog.next()"/>
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
const checklistMenu = useChecklistStore()
const filter = ref("")
const page_id = useRoute().params.page;
const tab = ref("tab1")
const data = ref({})
const checkusers = ref([])
const pagination = {
  rowsPerPage: 15
}
const checklist_status_options = [
  {label: "開始前", value: '0'},
  {label: "チェック中", value: '1'},
  {label: "完了", value: '2'},
]
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
const checklist_item_status_options = [
  {label: "未チェック", value: '0'},
  {label: "チェック完了", value: '1'}
]
const displayStatus = (status) => {
  return checklist_item_status_options[status].label
}
const columns = [
  {name: 'id', required: true, label: 'ID', align: 'left', field: row => row.id, sortable: true},
  {name: 'name', required: false, label: '名前', align: 'left', field: row => row.name, sortable: true},
  {name: 'status', required: false, label: 'ステータス', align: 'left', field: row => row.status, format: val => displayStatus(val), sortable: true},
  {name: 'check_date', required: false, label: 'チェック日時', align: 'left', field: row => row.check_date, sortable: true},
  {name: 'order_num', required: false, label: '並び順', align: 'right', field: row => row.order_num, sortable: true},
  {name: 'create_date', required: false, label: '作成日時', align: 'left', field: row => row.create_date, sortable: true},
  {name: 'create_user_id', required: false, label: '作成者ID', align: 'left', field: row => row.create_user_id, sortable: true},
  {name: 'create_user_name', required: false, label: '作成者名', align: 'left', field: row => row.create_user_name, sortable: true},
  {name: 'update_date', required: false, label: '更新日時', align: 'left', field: row => row.update_date, sortable: true},
  {name: 'update_user_id', required: false, label: '更新者ID', align: 'left', field: row => row.update_user_id, sortable: true},
  {name: 'update_user_name', required: false, label: '更新者名', align: 'left', field: row => row.update_user_name, sortable: true},
]

async function reload(){
  const resData = await $fetch("/api/checklist/" + page_id)
  data.value = resData

  const resCheckusers = await $fetch("/api/checklist/" + page_id + "/users/list")
  if(resCheckusers){
    checkusers.value = resCheckusers
  }
}
function update(){
  console.log(data)
  dialog.value.message = "チェックシートを更新します。\nよろしいですか？"
  dialog.value.display = true
  dialog.value.next = async () => {
    // API呼び出し
    const res = await $fetch("/api/checklist/" + page_id, {
      method: "PUT",
      headers: {"Content-Type": "application/json"},
      body: {
        request: {
          authId: auth.userId,
          authName: auth.userName
        },
        data: {
          name: data.value.name,
          status: data.value.status,
          order_num: data.value.order_num
        }
      }
    })
    // リロード
    navigateTo(`/manage/checklist/list`)
    checklistMenu.load()
  }
}

function addChecklistUser(){
  editDialog.value.name = null
  editDialog.value.status = '0'
  if(checkusers.value.length > 0){
    editDialog.value.order_num = checkusers.value.reduce((prev, current) => prev.order_num > current.order_num ? prev : current).order_num + 1
  } else {
    editDialog.value.order_num = 1
  }
  editDialog.value.display = true
  editDialog.value.next = async () => {
    // API呼び出し
    const res = await $fetch("/api/checklist/" + page_id + "/users/add", {
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
function deleteChecklistUser(id, name) {
  dialog.value.icon = "error"
  dialog.value.iconColor = "red"
  dialog.value.message = 
    "以下のチェックユーザーを削除します。\nよろしいですか？\n"
  + "ID  : " + id + "\n"
  + "名称: " + name;
  dialog.value.display = true
  dialog.value.next = async () => {
    // API呼び出し
    const res = await $fetch("/api/checklist/" + page_id + "/users/" + id, {
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
    // リロード
    reload()
  }
}

onMounted(() => {
  reload()
})
</script>
<style lang="css" scoped>
.readonly {
  background-color: #cccccc;
}
.disabled {
  background-color: #dddddd;
}
</style>