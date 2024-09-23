const randInt = (min, max)=>{
    return Math.floor(Math.random() * (max - min) ) + min;
}


// matrix([a, b], [x^2, y-4])

const randMatrix = (row, col)=>{
    let matArray = []
    let matNerdamer = 'matrix('
    for (let i = 0; i < row; i++) {
        let aRow = []
        for (let j = 0; j < col; j++) {
            let a = randInt(-5, 6)
            aRow.push(a)
        }
        matArray.push(aRow)
        matNerdamer += '['+aRow.toString()+'],'
    } 
    matNerdamer = matNerdamer.slice(0, matNerdamer.length-1) + ')'

    let matrix = {matArray: matArray, matNerdamer:matNerdamer}
    return matrix   
}

const clearNerdamerMatrix = (matrix)=>{
    return `\\begin{matrix}${matrix.slice(15, matrix.length-13)}\\end{matrix}`
}

const random_function = (arg)=>{
    let index = 1
    switch(index) {
        case 1 :
            let a = randInt(1, 6)
            let b = randInt(-5, 6)
            let c = randInt(-5, 6)
            return `log(${a}*${arg}^2+${b}*${arg}+${c})`
            break;
        default :
            return 'error, check function index! '
            break

    }

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

const makeTriplet = n =>{
    let triplets = [
        [1, 2, 2],
        [1, 4, 8],
        [2, 3, 6],
        [2, 4, 4]
    ]

    const shuffleArray = array => {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    }

    let output = []

    for (let j = 1; j<n+1; j++){
        indexer = randInt(0, triplets.length)
        output.push(triplets[indexer])
        triplets.splice(indexer, 1)
    }





    return output
}




const WorkEditor = {
    data() {
        return {
            PreviewContent: 'Здесь появится превью работы.',
            templates: [],
            tasks: [],
            currentTemplate: {id:'', name:''}
        }
    },

    created:  function(){
        this.loadTemplates()
    },

    methods: {


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



        MakePreview(event) {
            this.PreviewContent = '<ol>'
            for (var i = 0; i < this.tasks.length; i++) 
            {
                this.PreviewContent += '<li>'
                let taskRender = new Function (this.tasks[i].body)
                let theTask = taskRender()
                this.PreviewContent += theTask.ask
                this.PreviewContent += '<br>'
                this.PreviewContent += '<strong>Ответ: </strong>'
                this.PreviewContent += theTask.ans
                this.PreviewContent += '</li>'
            }
            this.PreviewContent += '</ol>'

            setTimeout(()=>{
                MathJax.typesetPromise().then(()=>{
                    console.log('Typeseted!')
                })
            }, 100)

        },

        changeTask(event) {
            this.tasks[event.target.id].body = event.target.value
            this.MakePreview()
        },

        adNewTask(){
            let body = `
let a = randInt(-10,10)
let b = randInt(1, 10)

let ask = \`Найдите квадрат модуля числа \\\\( \$\{a\}\ + \$\{b\}\i \\\\) \`
let ans = a**2+b**2
            
return {ask: ask, ans: ans}`
            this.tasks.push({body: body})
            this.MakePreview()
        },

        DeleteTask(idx){
            if(confirm('Удалить упражнение?')){
                if(this.currentTemplate.ID){
                    this.DBask('delete from templates_exercises where template=? and exercise =?', [this.currentTemplate.ID, this.tasks[idx].ID]).then(()=>{
                        this.openTemplate(this.currentTemplate.ID)
                    })
                }
                else{
                    this.tasks.splice(idx, 1)
                    this.MakePreview()
                }
            }
        },





        // CRUD for tamplates

        inputTemplateTitle(event) {
            this.currentTemplate.name = event.target.value  
        },

        newTemplateMenu(){
            this.currentTemplate = {ID:'', title:''}
            this.tasks = []
            this.PreviewContent = 'Здесь появится превью работы.'
        },

        loadTemplates(){
            this.APIget('http://127.0.0.1:8000/api/v1/templates')
            .then(data=>{ 
                this.templates = data
             })
            .catch(err=>{
                console.log("Не удалось загрузить список групп!")
                console.log(err)})

        },

        openTemplate: async function(id){
            this.newTemplateMenu()
            this.currentTemplate = await this.APIget('http://127.0.0.1:8000/api/v1/template/'+id)
            this.tasks = this.currentTemplate.exercises
            this.MakePreview()

        },


        deleteTemplate(id){
            if(confirm('Удалить шаблон?')){
                this.APIdelete('http://127.0.0.1:8000/api/v1/template/'+id).then(res=>{
                    this.loadTemplates()
                    this.newTemplateMenu()
                }, err=>{console.log(err)})

            }         
        },


        saveTemplate() {
            let allInserts = []
            const templateData = {"name": this.currentTemplate.name, "comment": ""}
            let exerciseData = {"name":"coming soon", "body":"", "comment":""}
            if(this.currentTemplate.id){
                this.APIput("http://127.0.0.1:8000/api/v1/template/"+this.currentTemplate.id, templateData).then(response=>{
                    const theTemplate = response.id
                    for (let exercise of this.tasks){
                        exerciseData.body = exercise.body
                        if(exercise.id){
                            this.APIput("http://127.0.0.1:8000/api/v1/exercise/"+exercise.id, exerciseData).then(res=>{
                                allInserts.push(this.APIpost("http://127.0.0.1:8000/api/v1/settemplexer", {"template": theTemplate, "exercise": res.id}))
                            }, error=>{console.log('Ошибка сохранения упражнения' + error)})
                        }
                        else{
                            this.APIpost("http://127.0.0.1:8000/api/v1/exercise/new", exerciseData).then(res=>{
                                allInserts.push(this.APIpost("http://127.0.0.1:8000/api/v1/settemplexer", {"template": theTemplate, "exercise": res.id}))
                            }, error=>{console.log('Ошибка сохранения упражнения' + error)})
                        }
                    }
                    Promise.all(allInserts).then(result => {
                        this.loadTemplates()
                        this.openTemplate(theTemplate)
                        console.log('Шаблон добавлен'+result);
                      }, error=>{console.log('Не удалось связать шаблон и упражнение: '+error)}) 
                }, error=>{console.log('Не удалось сохранить новый шаблон: '+error)})
            }
            else{
                this.APIpost("http://127.0.0.1:8000/api/v1/template/new", templateData).then(response=>{
                    const theTemplate = response.id
                    for (let exercise of this.tasks){
                        exerciseData.body = exercise.body
                        if(exercise.id){
                            this.APIput("http://127.0.0.1:8000/api/v1/exercise/"+exercise.id, exerciseData).then(res=>{
                                allInserts.push(this.APIpost("http://127.0.0.1:8000/api/v1/settemplexer", {"template": theTemplate, "exercise": res.id}))
                            }, error=>{console.log('Ошибка сохранения упражнения' + error)})
                        }
                        else{
                            this.APIpost("http://127.0.0.1:8000/api/v1/exercise/new", exerciseData).then(res=>{
                                allInserts.push(this.APIpost("http://127.0.0.1:8000/api/v1/settemplexer", {"template": theTemplate, "exercise": res.id}))
                            }, error=>{console.log('Ошибка сохранения упражнения' + error)})
                        }
                    }
                    Promise.all(allInserts).then(result => {
                        this.loadTemplates()
                        this.openTemplate(theTemplate)
                        console.log('Шаблон добавлен'+result);
                      }, error=>{console.log('Не удалось связать шаблон и упражнение: '+error)}) 
                }, error=>{console.log('Не удалось сохранить новый шаблон: '+error)})
            }
        },

    }
}

Vue.createApp(WorkEditor).mount('#bars')
