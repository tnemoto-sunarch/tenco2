<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <q-card>
      <q-bar class="bg-green text-white">
        <div>ユーザー情報</div>
      </q-bar>
      <q-card-section>
        <q-field color="black" filled label="ユーザーID" stack-label>
          <template v-slot:prepend>
            <q-icon name="edit_off" />
          </template>
          <template v-slot:control>
            <div class="self-center full-width no-outline" tabindex="0">{{ data.id }}</div>
          </template>
        </q-field>
        <q-field color="black" filled label="名前" stack-label>
          <template v-slot:prepend>
            <q-icon name="edit_off" />
          </template>
          <template v-slot:control>
            <div class="self-center full-width no-outline" tabindex="0">{{ data.name }}</div>
          </template>
        </q-field>
        <div style="margin-top: 10px">ユーザーIDは30日間、Cookieに保存されます</div>
      </q-card-section>
      <q-card-actions align="center">
        <q-btn rounded color="primary" icon="add" label="再登録" @click="navigateTo('/regist')"/>
      </q-card-actions>
    </q-card>
  </div>
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
  data.value.name = auth.userName
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