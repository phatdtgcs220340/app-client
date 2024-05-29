<script setup lang="ts">
  import { reactive, ref, watch } from 'vue';
  import LoginBox from './components/Login/LoginBox.vue';
  import SideBar from './components/SideBar/SideBar.vue';
  import WelcomePage from './components/Page/WelcomePage.vue';
  import AccountPage from './components/Page/AccountPage.vue';
  import LoadingPage from './components/Loading/LoadingPage.vue';
  import { setUserDetails } from './utils/userdetails';
  import { setAccount } from './utils/account';

  const loginBoxVisible = ref(false);
  const pageState = ref('dashboard');
  const loadCompleted = ref(false);
  const userdetails = reactive({
      fullName : '',
      username : ''
  })
  const account = reactive({
    id : '',
    username : '',
    password : '',
    applicationName : '',
    type: '',
    dateAudit : ''
  })
  watch(pageState, async (state) => {
    loadCompleted.value = false;
    console.log(state)
    if (state == 'dashboard' && userdetails.fullName == '') {
      await setUserDetails(userdetails); 
      console.log(userdetails)
    }
    if (state.startsWith('application')) {
      let appId = state.split(" ")[1];
      await setAccount(appId, account)
    }
    loadCompleted.value = true;
  },
  { immediate: true }
  )
</script>

<template>
  <LoginBox
    v-show="loginBoxVisible"
  />
  <SideBar 
    @toggle-login="() => loginBoxVisible = !loginBoxVisible"
    @toggle-dashboard="() => pageState = 'dashboard'"
    @toggle-account="(id) => pageState = `application ${id}`"
  />
  <div class="p-4 pt-8 sm:ml-64">
    <div class="p-2 border-2 border-gray-200 border-dashed rounded-lg ">
      <WelcomePage v-if="pageState == 'dashboard' && loadCompleted" 
        :full-name="userdetails.fullName"
        class="bg-gray-100 rounded-lg"/>
      <AccountPage v-if="pageState.startsWith('application') && loadCompleted"
        :id="account.id"
        :username="account.username"
        :application="account.applicationName"
        :password="account.password"
        decrypted-password="*******"
        :type="account.type"
        :date-audit="account.dateAudit"
        class="bg-gray-100 rounded-lg"
      />
      <LoadingPage v-if="!loadCompleted" class="bg-gray-100 rounded-lg"/>
    </div>
  </div>
</template>

<style scoped>
/* Add your styles here */
</style>
