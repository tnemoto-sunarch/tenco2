export default defineNuxtRouteMiddleware(async (to, from) => {
    console.log("request > ")
    console.log(to)
    const auth = useAuthStore()
    await auth.load()
    console.log(" >> login  : " + auth.login)
    console.log(" >> uid    : " + auth.userId)
    console.log("result = ", (!auth.login && to.path !== "/regist"))
    if(!auth.login && to.path !== "/regist"){
        console.log("redire ct to regist")
        return navigateTo("/regist")
    } else {
        if(auth.login){
            console.log("no redirect")
            await $fetch("/api/users/" + auth.userId + "/access", {
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
        }
    }
})