const studentEditor = {
    data() {
        return {
            curentGroup: {id:'', name:'', users: [], comment: ''},
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
            this.curentGroup.id = groupId
            this.curentGroup.users = []
            let users = []
            let curentGroup = await this.APIget('http://127.0.0.1:8000/api/v1/group/'+groupId)
            this.curentGroup.name =  curentGroup.name
            this.curentGroup.id =  curentGroup.id
            /*res = await this.DBask('SELECT * FROM users where id in (select usr from users_groups where grp =?) order by surname',[groupId])
            for (var i = 0; i < res.rows.length; i++){
                users.push(res.rows.item(i))
            }*/
            this.curentGroup.users = users
        },


        addGroup: async function(){
            let postInfo = {name: this.curentGroup.name, comment:''}
            if(this.curentGroup.id){ //                     Если эта группа имеет id => она есть в базе, значит редактируем ее найдя по этому id
                let respon = await this.APIput('http://127.0.0.1:8000/api/v1/studentGroups/'+this.curentGroup.id, postInfo)
                this.fetchGroups()
                this.curentGroup.id = respon.id

            } else{                 //                      Иначе добавляем в базу
                let respon = await this.APIpost('http://127.0.0.1:8000/api/v1/studentGroups/new', postInfo)
                this.curentGroup.id = respon.id
                this.fetchGroups()
            }

        },

        addGroupMenu(){
            this.curentGroup = {id:'', name:'', users: [], comment: ''}
        },


        deleteGroup(id){
            if(confirm('Вы уверены, что хотите удалить группу?')){
                this.APIdelete('http://127.0.0.1:8000/api/v1/studentGroups/'+id)
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




  


/* 
"CREATE TABLE groups (ID Integer PRIMARY KEY AUTOINCREMENT, name text)"
"CREATE TABLE users (ID Integer PRIMARY KEY AUTOINCREMENT, name text, surname text)" 
"CREATE TABLE users_groups (ID Integer PRIMARY KEY AUTOINCREMENT, usr integer, grp integer)"

"CREATE TABLE templates (ID Integer PRIMARY KEY AUTOINCREMENT, title text)"
"CREATE TABLE exercises (ID Integer PRIMARY KEY AUTOINCREMENT, body text)"
"CREATE TABLE templates_exercises (ID Integer PRIMARY KEY AUTOINCREMENT, template integer, exercise integer)"

"CREATE TABLE works (ID Integer PRIMARY KEY AUTOINCREMENT, name text, grp integer, template integer, date text)"
"CREATE TABLE tasks (ID Integer PRIMARY KEY AUTOINCREMENT, student Integer, ask text, rightanswer text, answer text, work Integer, date Integer)"
*/

