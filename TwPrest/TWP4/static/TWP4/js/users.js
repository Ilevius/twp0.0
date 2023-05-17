const studentEditor = {
    data() {
        return {
            curentGroup: {id:'', name:'', students: [], comment: ''},
            allGroups: []
        }
    },

    created:  function(){
        this.fetchGroups()
    },


    methods: {
    //                      Group CRUD    


        APIget(url){
            return fetch(url).then(response => {
                return response.json()
            })
        },

        APIpost(url, data){
            const options = {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(data)
              }
            return fetch(url, options).then(response => {
                return response.json()
            })
        },

        APIdelete(url){
            return fetch(url, {
            method: 'DELETE',
            })
            .then(res =>{return res.text()}) // or res.json()
        },


        APIput(url, data){
            const options = {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(data)
              }
            return fetch(url, options).then(response => {
                return response.json()
            })
        },

        fetchGroups(){
            this.APIget('http://127.0.0.1:8000/api/v1/groups')
            .then(data=>{ 
                this.allGroups = data
             })
            .catch(err=>{
                console.log("Не удалось загрузить список групп!")
                console.log(err)})

        },

        inputGroupName(event) {
            this.curentGroup.name = event.target.value            
        },

        openGroup: async function(groupId){
            this.curentGroup = await this.APIget('http://127.0.0.1:8000/api/v1/group/'+groupId)
        },


        addGroup: async function(){
            let postInfo = {name: this.curentGroup.name, comment:''}
            if(this.curentGroup.id){ //                     Если эта группа имеет id => она есть в базе, значит редактируем ее найдя по этому id
                let respon = await this.APIput('http://127.0.0.1:8000/api/v1/group/'+this.curentGroup.id, postInfo)
                this.fetchGroups()
                this.curentGroup.id = respon.id

            } else{                 //                      Иначе добавляем в базу
                let respon = await this.APIpost('http://127.0.0.1:8000/api/v1/group/new', postInfo)
                this.curentGroup.id = respon.id
                this.fetchGroups()
            }

        },

        addGroupMenu(){
            this.curentGroup = {id:'', name:'', users: [], comment: ''}
        },


        deleteGroup(id){
            if(confirm('Вы уверены, что хотите удалить группу?')){
                this.APIdelete('http://127.0.0.1:8000/api/v1/group/'+id)
                .then(data=>{ 
                    this.fetchGroups()
                    this.addGroupMenu()
                 })
                .catch(err=>{
                    this.fetchGroups()
                    this.addGroupMenu()
                    console.log("Не удалось удалить группу!")
                    console.log(err)})
                }
        },



    //                      Student CRUD    
        addNewUser(){
            /*nude = {ID: '', name:'', surname:''}
            this.curentGroup.users.push(nude)*/
        },

        deleteUser(userInfo){
            /*if(confirm('Вы уверены, что хотите удалить из списка группы этого студента: '+userInfo.fio+'?')){
                this.DBask('DELETE FROM users_groups where usr = ?',[userInfo.id]).then(()=>{
                    this.curentGroup.users.splice(userInfo.idx, 1)
                })
            }*/
            
        },

        userPropEdit(event){
           /* if(event.target.className == 'username'){
                this.curentGroup.users[event.target.id].name = event.target.value    
            } else if (event.target.className == 'usersurname'){
                this.curentGroup.users[event.target.id].surname = event.target.value 
            }  */ 
        }, 

 
    }
}

Vue.createApp(studentEditor).mount('#bars')