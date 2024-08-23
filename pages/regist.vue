<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <q-card>
      <q-bar class="bg-green text-white">
        <div>ユーザー登録</div>
      </q-bar>
      <q-card-section>
        <q-input color="blue" filled v-model="data.id" label="ユーザーID">
          <template v-slot:prepend>
            <q-icon name="edit" />
          </template>
        </q-input>
        <q-input color="blue" filled v-model="data.name" label="名前">
          <template v-slot:prepend>
            <q-icon name="edit" />
          </template>
        </q-input>
        <div style="margin-top: 10px">ユーザーIDは30日間、Cookieに保存されます</div>
      </q-card-section>
      <q-card-actions align="center">
        <q-btn rounded color="primary" icon="add" label="登録" @click="registUser()"/>
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
const data = ref({
  id: '',
  name: '',
})
const dialog = ref({
  display: false,
  icon: "info",
  iconColor: "blue",
  message: "",
  next: function(){return null;}
})

async function reload(){
  await auth.load()
  data.value.id = auth.userId
}
function registUser() {
  dialog.value.message = 
    "ユーザー登録をします。\nよろしいですか？"
  dialog.value.display = true
  dialog.value.next = async () => {
    // API呼び出し
    const res = await $fetch("/api/users/add", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: {
        data: {
          id: data.value.id,
          name: data.value.name
        }
      }
    })
    auth.save(data.value.id)
    navigateTo("/")
  }
}

onMounted(() => {
  reload()
})
</script>

<style lang="css" scoped>
.q-card {
  width: 340px;
  max-width: 500px;
  margin-left:  auto;
  margin-right:  auto;
}
</style>