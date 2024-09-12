<template>
    <div class="q-pa-md">
      <q-layout 
        view="lHh lpr lFf" 
        container 
        style="height: 85svh" 
        class="shadow-2 rounded-borders"
      >
        <q-header elevated>
          <q-bar 
            :class="selectBar(checklist.status)"
          >
            <q-icon name="fact_check" />
            <div>{{ checklist.name }}</div>
          </q-bar>
          <q-bar 
            :class="selectBar(checklist.status)"
          >
          <q-chip 
              v-if="checklist.open_date != null"
              dense 
              square 
              size="sm" 
              color="green" 
              text-color="white" 
              icon="event"
            >{{ checklist.open_date }}</q-chip>
            <q-chip 
              v-if="checklist.close_date != null"
              dense 
              square 
              size="sm" 
              color="red" 
              text-color="white" 
              icon="event"
            >{{ checklist.close_date }}</q-chip>
            <q-space />
  
            <q-btn 
              dense 
              flat 
              icon="play_circle_outline" 
              @click="startChecklist()"
              :disable="auth.type == '0' || checklist.status == '1' || checklist.status == '2'"/>
            <q-btn 
              dense 
              flat 
              icon="stop" 
              @click="closeChecklist()"
              :disable="auth.type == '0' || checklist.status == '0' || checklist.status == '2'"/>
          </q-bar>
          <q-bar class="bg-grey-5 text-white">
              <q-icon name="thumb_up" />
              <div>{{ complateCount }}</div>&nbsp;&nbsp;
              <q-icon name="thumb_down" />
              <div>{{ notComplateCount }}</div>&nbsp;&nbsp;
              <q-icon name="thumbs_up_down" />
              <div>{{ totalCount }}</div>
            </q-bar>
        </q-header>
  
        <q-page-container>
          <q-page class="q-pa-md">
            <q-list dense bordered padding class="rounded-borders text">

              <q-item 
                v-for="(item, i) in checklistusers" :key="i"
              >
                <q-item-section avatar>
                  <q-icon v-if="item.status == '0'" name="check_circle_outline" />
                  <q-icon v-if="item.status == '1'" name="check_circle" color="green" />
                </q-item-section>
                <q-item-section>{{ item.name }}</q-item-section>
                <q-space />
                <div>
                  {{ formatCheckDate(item.check_date) }}
                  <q-toggle
                      v-model="item.status"
                      true-value="1"
                      false-value="0"
                      checked-icon="check"
                      color="green"
                      unchecked-icon="clear"
                      size="lg"
                      :disable="!( (auth.type == '1' || auth.type == '2') && checklist.status == '1' )"
                      @update:model-value="updateCheck(item.id, item.status)"
                    />
                </div>
              </q-item>
            </q-list>
          </q-page>
        </q-page-container>
      </q-layout>
    </div>
    <q-dialog v-model="dialog.display" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar size="50px" icon="info" text-color="blue" />
          <span class="q-ml-sm" style="white-space: pre-wrap;">{{ dialog.message }}</span>
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
const dialog = ref({
  display: false,
  icon: "info",
  iconColor: "blue",
  message: "",
  next: function(){return null;}
})
const page_id = useRoute().params.page
const checklist = ref({})
const checklistusers = ref([])
const complateCount = ref(0)
const notComplateCount = ref(0)
const totalCount = ref(0)

async function reload(){
  const resData = await $fetch('/api/checklist/' + page_id);
  checklist.value = resData

  const resUsers = await $fetch('/api/checklist/' + page_id + "/users/list");
  checklistusers.value = resUsers
  reCalculate()
}

function reCalculate(){
  complateCount.value = checklistusers.value.filter((item) => item.status == '1').length
  notComplateCount.value = checklistusers.value.filter((item) => item.status == '0').length
  totalCount.value = checklistusers.value.length
}

function selectBar(status){
  switch(status){
    case '0':
      return "checklist-standby";
    case '1':
      return "checklist-open";
    case '2':
      return "checklist-close";
  }
 }

 function startChecklist() {
  dialog.value.message = "チェックリストを開始します。\nよろしいですか？";
  dialog.value.display = true;
  dialog.value.next = async () => {
    //API呼び出し
    const res = await $fetch("/api/checklist/" + page_id + "/start", {
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
  };
}
function closeChecklist(){
  dialog.value.message = "チェックリストを完了します。\nよろしいですか？";
  dialog.value.display = true;
  dialog.value.next = async () => {
    //API呼び出し
    const res = await $fetch("/api/checklist/" + page_id + "/complate", {
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
  };
}
async function updateCheck(cuid, value){
  // API呼び出し
  const res = await $fetch("/api/checklist/" + page_id + "/users/" + cuid + "/check", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: {
      request: {
        authId: auth.userId,
        authName: auth.userName
      },
      data: {
        status: value
      }
    }
  })
  // reload
  reload()
}
function formatCheckDate(value){
  try {
    if(value){
      return value.substring(11)
    }
  }catch(error){

  }
  return ""
}
onMounted(() => {
  reload()
})
</script>

<style lang="css" scoped>
.checklist-standby {
  background-color: white;
  color: black;
}
.checklist-open {
  background-color: dodgerblue;
  color: white;
}
.checklist-close {
  background-color: green;
  color: white;
}
</style>