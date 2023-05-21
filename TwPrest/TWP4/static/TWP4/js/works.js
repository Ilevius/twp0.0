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
            } else if (event.target.id == 'startdate'){
                this.curentWork.startdate = event.target.value 
            } 
              else if (event.target.id == 'finishdate'){
                this.curentWork.finishdate = event.target.value 
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
            let work = await this.APIpost('http://127.0.0.1:8000/api/v1/work/new', this.curentWork)
            let group = await this.APIget('http://127.0.0.1:8000/api/v1/group/'+this.curentWork.group)
            let template = await this.APIget('http://127.0.0.1:8000/api/v1/template/'+this.curentWork.template)
            for(const student of group.students){
                for(const exercise of template.exercises){
                   let task = {} 
                   task.student = student.id
                   task.work = work.id
                   task.comment = 'Coming soon'
                   let taskRender = new Function(exercise.body)
                   let theTask = taskRender()
                   task.ask = theTask.ask
                   task.rightanswer = theTask.ans
                   let newTask = await this.APIpost('http://127.0.0.1:8000/api/v1/task/new', task)
                   console.log(newTask)
                }
            }
            this.loadWorks()
            // нужно оптимизировать код (массив промисов и тп), добавить отображение окна ожидания
        },

        openWork(workId){
            this.APIget('http://127.0.0.1:8000/api/v1/work/'+workId).then(theWork=>{
                this.curentWork = theWork
            })
        },

        deleteWork(workId){
            if(confirm('Вы уверены, что хотите удалить работу?')){
                this.APIdelete('http://127.0.0.1:8000/api/v1/work/'+workId).then(()=>{this.loadWorks()})
            }
        },

        printWork: async function(workId){
            let text = ''
            text += '\n\\begin{document}'
            let theWork = await this.APIget('http://127.0.0.1:8000/api/v1/work/'+workId)
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
            // отображаем меню ввода ответов
            this.revision = true
                 
            //                      Создаем чек-лист и заполняем его в цикле
            let checkList = []
            for(const student of this.curentWork.group.students){
                let checkListItem = {}
                checkListItem.studentId = student.id
                checkListItem.name = student.first_name
                checkListItem.surname = student.last_name
                checkListItem.answers = []
                checkListItem.passed = false

                let theStudentTasks = await this.APIpost("http://127.0.0.1:8000/api/v1/taskbystudentandwork", {"student": student.id, "work": this.curentWork.id})
                for(const task of theStudentTasks){
                    checkListItem.answers.push({id: task.id, answer: task.answer, rightanswer: task.rightanswer}) 
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

