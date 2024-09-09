<template>
  <div class="q-pa-md">
    <q-bar class="bg-blue text-white ">
      <div>チェックシートの追加</div>
    </q-bar>
    <q-card>
      <q-card-section>
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
          :options="checklist_status_options" 
        >
          <template v-slot:prepend>
            <q-icon name="edit" />
          </template>
        </q-select>
        <q-input color="blue" filled v-model="data.order_num" label="並び順">
          <template v-slot:prepend>
            <q-icon name="edit" />
          </template>
        </q-input>
        <q-toggle
            v-model="data.all_reg_users"
            true-value="1"
            false-value="0"
            checked-icon="check"
            color="green"
            unchecked-icon="clear"
            size="lg"
            label="全ての登録済みチェック対象を追加する"
          />
      </q-card-section>
      <q-card-actions align="center">
        <q-btn class="bg-blue" rounded color="white" icon="add" label="追加" @click="addChecklist()"/>
      </q-card-actions>
    </q-card>
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
const data = ref({
    name: "",
    status: "0",
    order_num: 1,
    all_reg_users: "1"
})
const dialog = ref({
  display: false,
  icon: "info",
  iconColor: "blue",
  message: "",
  next: function(){return null;}
})
const checklist_status_options = [
  {label: "開始前", value: '0'},
  {label: "チェック中", value: '1'},
  {label: "完了", value: '2'},
]

function addChecklist(){
  dialog.value.message = "チェックシートを追加します。\nよろしいですか？"
  dialog.value.display = true
  dialog.value.next = async () => {
    // API呼び出し
    const res = await $fetch("/api/checklist/add", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: {
        request: {
          authId: auth.userId,
          authName: auth.userName
        },
        data: {
          name: data.value.name,
          status: data.value.status,
          order_num: data.value.order_num,
          all_reg_users: data.value.all_reg_users
        }
      }
    })
    reload()
    checklistMenu.load()
  }
}
async function reload(){
  data.value.name = ""
  data.value.status = "0"


  const resData = await $fetch('/api/checklist/list')
  console.log(resData)

  data.value.order_num = resData.length + 1
}

onMounted(() => {
  reload()
})
</script>