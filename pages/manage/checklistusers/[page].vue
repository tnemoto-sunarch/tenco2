<template>
  <div class="q-pa-md">
    <q-layout view="lHh lpr lFf" container style="height: 800px" class="shadow-2 rounded-borders">
      <q-header elevated>
        <q-bar class="bg-green text-white ">
          <div>{{ page_id }}</div>
          <q-space />
          <q-btn label="更新&nbsp" glossy icon="edit" class="bg-black" color="white" style="width: 80px"
            @click="update()"/>
        </q-bar>
        <q-bar class="bg-green text-white">
          <q-space />
          <q-tabs v-model="tab" shrink stretch>
            <q-tab name="tab1" label="基本" />
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
              <q-input color="blue" filled v-model="data.name" label="名前">
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
                :options="options" >
                <template v-slot:prepend>
                  <q-icon name="edit" />
                </template>
              </q-select>
              <q-input color="blue" filled v-model="data.order_num" label="並び順">
                <template v-slot:prepend>
                  <q-icon name="edit" />
                </template>
              </q-input>
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
          </q-tab-panels>
        </q-page>
      </q-page-container>
    </q-layout>
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
const page_id = useRoute().params.page;
const tab = ref("tab1")
const data = ref({})
const options = [
  {label: "無効", value: '0'},
  {label: "有効", value: '1'}
]
const dialog = ref({
  display: false,
  icon: "info",
  iconColor: "blue",
  message: "",
  next: function(){return null;}
})

async function reload(){
  const result = await $fetch("/api/checklistregusers/" + page_id)
  data.value = result
  console.log(data.value)
}
function update(){
  console.log(data)
  dialog.value.message = "チェックシート登録ユーザーを更新します。\nよろしいですか？"
  dialog.value.display = true
  dialog.value.next = async () => {
    // API呼び出し
    const res = await $fetch("/api/checklistregusers/" + page_id, {
      method: "PUT",
      headers: {"Content-Type": "application/json"},
      body: {
        data: {
          name: data.value.name,
          status: data.value.status,
          order_num: data.value.order_num
        }
      }
    })
    // リストに戻る
    navigateTo('/manage/checklistusers/list')
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
</style>