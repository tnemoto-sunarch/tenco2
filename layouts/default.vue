<template>
  <q-layout view="hHh lpR fFf">

    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title @click="navigateTo('/')">
          <div>てんこちゃん <small>ver2.0</small></div>
        </q-toolbar-title>
        <q-chip 
          icon="account_circle"
          :color="typeMap[auth.type]"
        >{{ auth.userName }}</q-chip>
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered>
      <!-- drawer content -->
      <div class="q-pa-md q-gutter-sm">
        <q-list bordered class="rounded-borders">
          <q-expansion-item expand-separator icon="how_to_reg" label="チェックリスト" caption="" :disable="!auth.login">
            <q-list dense bordered padding class="rounded-borders text">

              <q-item 
                v-for="(item, i) in checklist.rows.value" :key="i"
                clickable 
                v-ripple 
                :active="activeMenu === item.id" 
                @click="activeMenu = item.id" 
                active-class="my-menu-link"
                :to="'/checklist/' + item.id"
              >
                <q-item-section avatar>
                  <q-icon v-if="item.status == 0" name="check_circle_outline" />
                  <q-icon v-if="item.status == 1" name="check_circle" color="blue" />
                  <q-icon v-if="item.status == 2" name="check_circle" color="green" />
                </q-item-section>

                <q-item-section>{{ item.name }}</q-item-section>
              </q-item>
            </q-list>

          </q-expansion-item>

          <q-expansion-item expand-separator icon="settings" label="設定" caption="" v-if="auth.type == '1' || auth.type == '2'">
            <q-list bordered padding class="rounded-borders text">
              <q-item clickable v-ripple 
                :active="activeMenu === 'addlist'" 
                @click="activeMenu = 'addlist'" 
                active-class="my-menu-link"
                to="/manage/checklist/add"
              >
                <q-item-section avatar>
                  <q-icon name="inbox" />
                </q-item-section>
                <q-item-section>チェックリストの追加</q-item-section>
              </q-item>

            </q-list>
          </q-expansion-item>

          <q-expansion-item expand-separator icon="build" label="管理者メニュー" caption="" v-if="auth.type == '2'">
            <q-list bordered padding class="rounded-borders text">
              <q-item clickable v-ripple 
                :active="activeMenu === 'admin_checklist'" 
                @click="activeMenu = 'admin_checklist'" 
                active-class="my-menu-link"
                to="/manage/checklist/list"
              >
                <q-item-section avatar>
                  <q-icon name="inbox" />
                </q-item-section>
                <q-item-section>チェックリスト</q-item-section>
              </q-item>
              <q-item clickable v-ripple 
                :active="activeMenu === 'admin_checklist_item'" 
                @click="activeMenu = 'admin_checklist_item'" 
                active-class="my-menu-link"
                to="/manage/checklistusers/list"
              >
                <q-item-section avatar>
                  <q-icon name="inbox" />
                </q-item-section>
                <q-item-section>チェック対象一覧</q-item-section>
              </q-item>
              <q-item clickable v-ripple 
                :active="activeMenu === 'admin_userlist'" 
                @click="activeMenu = 'admin_userlist'" 
                active-class="my-menu-link"
                to="/manage/users/list"
              >
                <q-item-section avatar>
                  <q-icon name="inbox" />
                </q-item-section>
                <q-item-section>ログインユーザー</q-item-section>
              </q-item>

            </q-list>
          </q-expansion-item>
        </q-list>
      </div>
    </q-drawer>

    <q-page-container>
      <NuxtPage />
    </q-page-container>

    <q-footer elevated class="bg-grey-8 text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-icon name="copyright" />
          SunArch Corp.
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>

  </q-layout>
</template>

<script setup>
const auth = useAuthStore()
const checklist = useChecklistStore()
const leftDrawerOpen = ref(false)
const activeMenu = ref(false)
const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
const typeMap = {
  "0": "",
  "1": "green text-white",
  "2": "red text-white"
}
await checklist.load()
</script>

<style lang="css" scoped>
.my-menu-link {
  color: white;
  background: #51c3f4;
}
</style>