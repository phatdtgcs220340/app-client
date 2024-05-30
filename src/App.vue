<script setup lang="ts">
  import { reactive, ref, watch } from 'vue';
  import LoginBox from './components/Login/LoginBox.vue';
  import SideBar from './components/SideBar/SideBar.vue';
  import WelcomePage from './components/Page/WelcomePage.vue';
  import AccountPage from './components/Page/AccountPage.vue';
  import CreateAccountPage from './components/Page/CreateAccountPage.vue';
  import LoadingPage from './components/Page/LoadingPage.vue';
  import ErrorPage from './components/Page/ErrorPage.vue';
  import { setUserDetails } from './api/get/userdetails';
  import { setAccount } from './api/get/account';

  const loginBoxVisible = ref(false);
  const pageState = ref('dashboard');
  const pageStatus = ref('loading');
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
    pageStatus.value = 'loading';
    console.log(state)
    try {
      if (state == 'dashboard' && userdetails.fullName == '') {
        await setUserDetails(userdetails); 
        console.log(userdetails)
      }
      if (state.startsWith('application')) {
        let appId = state.split(" ")[1];
        await setAccount(appId, account)
        
      }
      pageStatus.value = 'success';
    }
    catch{
      pageStatus.value = 'error';
    }
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
    @toggle-create-account="() => pageState='create'"
  />
  <div class="p-4 pt-8 sm:ml-64">
    <div class="p-2 border-2 border-gray-200 border-dashed rounded-lg ">
      <WelcomePage v-if="pageState == 'dashboard' && pageStatus == 'success'" 
        :full-name="userdetails.fullName"
        class="bg-gray-100 rounded-lg"/>
      <CreateAccountPage v-if="pageState == 'create'"
        class="bg-gray-100 rounded-lg"/>
      <AccountPage v-if="pageState.startsWith('application') && pageStatus == 'success'"
        :id="account.id"
        :username="account.username"
        :application="account.applicationName"
        :password="account.password"
        :type="account.type"
        :date-audit="account.dateAudit"
        class="bg-gray-100 rounded-lg"
      />
      <LoadingPage v-if="pageStatus == 'loading'" class="bg-gray-100 rounded-lg"/>
      <ErrorPage v-if="pageStatus == 'error'" class="bg-gray-100 rounded-lg"/>
    </div>
  </div>
</template>

<style scoped>
/* Add your styles here */
</style>
