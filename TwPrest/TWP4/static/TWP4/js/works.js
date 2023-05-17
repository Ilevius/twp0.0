const randInt = (min, max)=>{
    return Math.floor(Math.random() * (max - min) ) + min;
}

const random_polynome = (arg)=>{
    let index = 1
    switch(index) {
        case 1 :
            let a = randInt(1, 6)
            let b = randInt(-5, 6)
            let c = randInt(-5, 6)
            return `${a}*${arg}^2+${b}*${arg}+${c}`
            break;
        default :
            return 'error, check function index! '
            break

    }

}

const rand_poly_xy = ()=>{
    let a = randInt(1, 6)
    let b = randInt(-5, 6)
    let c = randInt(1, 6)
    return `${a}*x^${randInt(0, 3)}*y^${randInt(0, 3)}+${b}*x^${randInt(0, 3)}*y^${randInt(0, 3)}+${c}`
}

const rand_poly_xyz = ()=>{
    let a = randInt(1, 6)
    let b = randInt(-5, 6)
    let c = randInt(1, 6)
    return `${a}*x^${randInt(0, 3)}*y^${randInt(0, 3)}*z^${randInt(1, 3)}+${c}`
}


const elem_fun_xy = (index)=>{
    let arg = rand_poly_xy()
    switch(index) {
        case 1 :
            return `sin(${arg})`
            break;
        case 2 :
            return `cos(${arg})`
            break;
        case 3 :
            return `log(${arg})`
            break;

        case 4 :
            return `exp(${arg})`
            break;
        default :
            return `${arg}`
            break

    }}


    const elem_fun_xyz = (index)=>{
        let arg = rand_poly_xyz()
        switch(index) {
            case 1 :
                return `sin(${arg})`
                break;
            case 2 :
                return `cos(${arg})`
                break;
            case 3 :
                return `log(${arg})`
                break;
    
            case 4 :
                return `exp(${arg})`
                break;
            default :
                return `${arg}`
                break
    
        }}


const WorkEditor = {
    data() {
        return {
            curentWork: {id:'', name:'', group: '', template: '', date: ''},
            allWorks: [],
            groups: [],
            templates: [],
            revision: false,
            workCheckList: [{name:'', surname: '', answers: [] }]
        }
    },

    created:  function(){
        this.loadWorks()
        this.loadGroups()
        this.loadTemplates()
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

        DBask(){//затычка
        },

        loadWorks(){
            this.APIget('http://127.0.0.1:8000/api/v1/works').then(res=>{
                this.allWorks = res
            })
        },

        loadGroups(){
            this.APIget('http://127.0.0.1:8000/api/v1/groups').then(res=>{
                this.groups = res
            })
        },

        loadTemplates(){
            this.APIget('http://127.0.0.1:8000/api/v1/templates').then(res=>{
                this.templates = res
            })
        },

        workPropEdit(event){
            if(event.target.id == 'workName'){
                this.curentWork.name = event.target.value    
            } else if (event.target.id == 'workGroup'){
                this.curentWork.group = event.target.value 
            } else if (event.target.id == 'workDate'){
            this.curentWork.date = event.target.value 
            } else if (event.target.id == 'workTemplate'){
                this.curentWork.template = event.target.value 
            }
            if(event.target.className == "answerInput"){
                let theTestItem = this.workCheckList.find(item => item.studentId == event.target.name)
                let theTask = theTestItem.answers.find(item => item.id == event.target.id)
                theTask.answer = event.target.value
            } 
        }, 

        addNewWork: async function(){
            /*let thisWork = await this.DBask('insert into works (grp, name, template, date) values (?, ?, ?, ?)',[this.curentWork.group, this.curentWork.name, this.curentWork.template, this.curentWork.date])
            let thisWorkId = thisWork.insertId
            let theseUsers = await this.DBask('select usr from users_groups where grp = ?',[this.curentWork.group])
            let theseExercises = await this.DBask('SELECT * FROM exercises where id in (SELECT exercise FROM templates_exercises where template =?) order by id',[this.curentWork.template])
            for(var i = 0; i < theseUsers.rows.length; i++){ 
                let thisUserId = theseUsers.rows.item(i).usr
                console.log(thisUserId)
                for(var j = 0; j < theseExercises.rows.length; j++){
                    let thisExercise = theseExercises.rows.item(j)
                    let taskRender = new Function(thisExercise.body)
                    let theTask = taskRender()
                    let ask =  theTask.ask
                    let rightanswer = theTask.ans                    
                    this.DBask('insert into tasks (student, work, ask, rightanswer) values (?, ?, ?, ?)',[thisUserId, thisWorkId, ask, rightanswer])
                }
            }
            this.loadWorks() */
        },

        openWork(workId){
            /*this.APIget('http://127.0.0.1:8000/api/v1/group/'+workId).then(theWork=>{
                theWork = theWork.rows.item(0)
                this.curentWork.id = workId
                this.curentWork.name = theWork.name 
                this.curentWork.date = theWork.date
                this.DBask('select name from groups where id = ?',[theWork.grp]).then(res=>{
                    this.curentWork.group = res.rows.item(0).name
                })  
                this.DBask('select title from templates where id = ?',[theWork.template]).then(res=>{
                    this.curentWork.template = res.rows.item(0).title
                })   
            })*/
        },

        deleteWork(workId){
            if(confirm('Вы уверены, что хотите удалить работу?')){
                this.DBask('DELETE FROM tasks where work = ?',[workId]).then(()=>{
                    this.DBask('DELETE FROM works where id = ?',[workId]).then(()=>{
                        this.curentWork = {id:'', name:'', group: '', template: '', date: ''} 
                        this.loadWorks()
                    })    
                })
            }
        },

        printWork: async function(workId){
            let text = ''
            text += '\n\\begin{document}'
            let theWork = await this.DBask('select * from works where id = ?',[workId])
            theWork = theWork.rows.item(0)
            let theTasksSQL = await this.DBask('select * from tasks where work = ? order by id',[workId])
            let theTasks = []
            for(var i = 0; i < theTasksSQL.rows.length; i++){
                theTasks.push(theTasksSQL.rows.item(i))
            }
            
            let theStudents = await this.DBask('select * from users where id in (select usr from users_groups where grp = ?) order by surname',[theWork.grp])
            for(var i = 0; i < theStudents.rows.length; i++){
                let theStudent = theStudents.rows.item(i)

                text += '\\hfill \\break \\Large \n' + theStudent.name + ' ' + theStudent.surname + '\n \\normalsize'
                let theStudentTasks = theTasks.filter(item => item.student == theStudent.ID)
                text+= '\n \\begin{enumerate}'
                for(const task of theStudentTasks){
                    text += '\n \\item '+task.ask    
                }
                text+= '\n \\end{enumerate}'
            }
            text += '\n\\end{document}'
            this.writeFile(theWork.name+".tex", text);
        },

        checkWork: async function(){
            this.revision = true
        
            //                      Собираем все данные о работе
            let theWork = await this.DBask('select * from works where id = ?',[this.curentWork.id])
            theWork = theWork.rows.item(0)
            let theTasksSQL = await this.DBask('select * from tasks where work = ? order by id',[this.curentWork.id])
            
            //                      Формируем набор всех заданий для всех студентов для данной работы
            let theTasks = []
            for(var i = 0; i < theTasksSQL.rows.length; i++){
                theTasks.push(theTasksSQL.rows.item(i))
            }
            //                      Формируем список студентов
            let theStudents = await this.DBask('select * from users where id in (select usr from users_groups where grp = ?) order by surname',[theWork.grp])
            //                      Создаем чек-лист и заполняем его в цикле
            let checkList = []
            for(var i = 0; i < theStudents.rows.length; i++){
                let checkListItem = {}
                let theStudent = theStudents.rows.item(i)
                checkListItem.studentId = theStudent.ID
                checkListItem.name = theStudent.name
                checkListItem.surname = theStudent.surname
                checkListItem.answers = []
                checkListItem.passed = false

                let theStudentTasks = theTasks.filter(item => item.student == theStudent.ID)
                
                for(const task of theStudentTasks){
                    checkListItem.answers.push({id: task.ID, answer: task.answer, rightanswer: task.rightanswer}) 
                    if(task.answer){checkListItem.passed = true}   
                }
                
                checkList.push(checkListItem)
            }
            this.workCheckList = checkList
        },

        sendAnswers(studentId){
            let theTestItem = this.workCheckList.find(item => item.studentId == studentId)
            for(let answer of theTestItem.answers ){
                if(!answer.answer){
                    answer.answer = 'passed' 
                }
                this.DBask('update tasks  set answer = ? where id =?',[answer.answer, answer.id]).then(()=>{
                    this.checkWork()
                })
            }
        },

//                          Other options

        testMethod(){


                
            this.writeFile("9dksk239xwd.txt", "jxowsjsivneic");

        },


        writeFile(name, value) {
            var val = value;
            if (value === undefined) {
            val = "";
            }
            var download = document.createElement("a");
            download.href = "data:text/plain;content-disposition=attachment;filename=file, " + val;
            download.download = name;
            download.style.display = "none";
            download.id = "download"; document.body.appendChild(download);
            document.getElementById("download").click();
            document.body.removeChild(download);
            } 
        
    }
}

Vue.createApp(WorkEditor).mount('#bars')

