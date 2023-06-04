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

        // ^ тут добавить отображение внизу самой работы с ответами и решениями, или соединить это с функционалом checkWork

        deleteWork(workId){
            if(confirm('Вы уверены, что хотите удалить работу?')){
                this.APIdelete('http://127.0.0.1:8000/api/v1/work/'+workId).then(()=>{this.loadWorks()})
            }
        },

        makeTeX: async function(kind){
            let text = ''
            text += '\n\\begin{document}'
            
            for(const student of this.curentWork.group.students){
                text += '\\hfill \\break \\Large \n' + student.first_name + ' ' + student.last_name + '\n \\normalsize'
                let theStudentTasks = await this.APIpost("http://127.0.0.1:8000/api/v1/taskbystudentandwork", {"student": student.id, "work": this.curentWork.id})
                text+= '\n \\begin{enumerate}'
                for(const task of theStudentTasks){
                    text += '\n \\item '+task.ask    
                }
                text+= '\n \\end{enumerate}'
            }
            text += '\n\\end{document}'
            this.writeFile(this.curentWork.name+".tex", text)
            // нужно добавить выбор включения/невключения решения и ответа в файл, оформить в латехе это все в виде окружений 
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
                    let review = await this.expressionVS(task.answer, task.rightanswer)
                    checkListItem.answers.push({id: task.id, answer: task.answer, rightanswer: task.rightanswer, ask: task.ask, test: review})                   
                    if(task.answer){checkListItem.passed = true}   
                }
                console.log(checkListItem.answers)
                checkList.push(checkListItem)
            }
            this.workCheckList = checkList
            this.MakePreview()
        },

        sendAnswers(studentId){
            let theTestItem = this.workCheckList.find(item => item.studentId == studentId)
            for(let answer of theTestItem.answers ){
                if(!answer.answer){
                    answer.answer = 'passed' 
                }
                this.APIput("http://127.0.0.1:8000/api/v1/answertask/"+answer.id, {"answer":answer.answer, "answerdate": "2023-05-23T23:23"}).then(()=>{
                    this.checkWork()
                })
            }
        },

//                          Other options


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
        },
        
        MakePreview(event) {
            setTimeout(()=>{
                MathJax.typesetPromise().then(()=>{
                    console.log('Typeseted!')
                })
            }, 100)

        },

        expressionVS: async function(lHand, rHand){
            /*lHand = nerdamer.convertFromLaTeX("\\frac{\\sqrt{2}}{2}")
            rHand = nerdamer.convertFromLaTeX("\\frac{1}{\\sqrt{2}}")
            diff = nerdamer(lHand).subtract(rHand)
            return diff.evaluate().toString()//lHand.eq(rHand).toString()*/

            let result = await this.APIpost("http://127.0.0.1:8000/api/v1/expresionvs", {"lHand": lHand, "rHand": rHand})

            if(!result.error){
                if(result.result){
                    return "Верно"
                }
                else{
                    return "Неверно"
                }
            }
            else{
                return "Ошибка сравнения"
            }

            /*this.APIpost("http://127.0.0.1:8000/api/v1/expresionvs", {"lHand": lHand, "rHand": rHand}).then(result=>{
                if(!result.error){
                    if(result.result){
                        return "Верно"
                    }
                    else{
                        return "Неверно"
                    }
                }
                else{
                    return "Ошибка сравнения"
                }

            }, error=>{
                return error
            })*/

        }
        
    }
}

Vue.createApp(WorkEditor).mount('#bars')

