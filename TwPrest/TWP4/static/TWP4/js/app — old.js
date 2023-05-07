const randInt = (min, max)=>{
    return Math.floor(Math.random() * (max - min) ) + min;
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
            newSubjectName: '',
            tasks: [],
            subjects: [], 
            templates: [],
            currentTemplate: {ID:'', title:''}
        }
    },

    computed: {
        db: function (){
            return openDatabase("TWP4", "0.1", "TWP test database", 20000);
        }
    },


    created:  function(){
        this.loadTemplates()
    },

    methods: {

        DBask(ask, arg){
            const db = openDatabase("TWP4", "0.1", "TWP test database", 20000)
            return new Promise((resolve, reject)=>{
                if(db) {
                    db.transaction(tx => { tx.executeSql(ask, arg, (tx, result) => {
                        resolve(result)
                    }, (tx, error)=>{reject(error)}) })
                }
                else{
                    reject(new Error('DB connection failed'))
                }
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
            this.currentTemplate.title = event.target.value  
        },

        newTemplateMenu(){
            this.currentTemplate = {ID:'', title:''}
            this.tasks = []
            this.PreviewContent = 'Здесь появится превью работы.'
        },

        saveTemplate() {
            if(this.currentTemplate.ID){
                allInserts =[]
                this.DBask('update templates set title = ? where id = ?',[this.currentTemplate.title, this.currentTemplate.ID]).then(result=>{
                    for (let exercise of this.tasks){
                        allInserts.push(this.DBask('update exercises set body = ? where id = ?',[exercise.body, exercise.ID]))
                    }
                    Promise.all(allInserts).then(result => {
                        this.loadTemplates()
                        this.newTemplateMenu()
                        console.log('Шаблон изменен!'+result);
                      })   
                }, error=>{console.log(error)})
            }
            else{
                allInserts =[]
                this.DBask('INSERT INTO templates (title) VALUES (?)',[this.currentTemplate.title]).then(result=>{
                    let theTemplate = result.insertId
                    for (let exercise of this.tasks){
                        this.DBask('INSERT INTO exercises (body) VALUES (?)',[exercise.body]).then(result=>{
                            let theExercise = result.insertId
                            allInserts.push(this.DBask('INSERT INTO templates_exercises (template, exercise) VALUES (?, ?)',[theTemplate, theExercise]))
                        }, error=>{console.log(error)})
                    }
                    Promise.all(allInserts).then(result => {
                        this.loadTemplates()
                        this.newTemplateMenu()
                        console.log('Шаблон добавлен'+result);
                      })   
                }, error=>{console.log(error)})
            }
        },

        loadTemplates() {
            this.DBask('SELECT * FROM templates', []).then(result=>{
                let temps =[]
                for(let i = 0; i < result.rows.length; i++){
                    temps.push(result.rows.item(i))
                }
                this.templates = temps
            },error=>{
                console.log(error)
            }) 
        },

        deleteTemplate(id){
            if(confirm('Удалить шаблон?')){
                this.DBask('delete from templates where id =?', [id]).then(result=>{
                    this.loadTemplates()
                    this.newTemplateMenu()
                },error=>{
                    console.log(error)
                }) 
            }         
        },
//                          You will get at middle pannel, title and exercises of some template if you click it  
        openTemplate(id) { 
            this.newTemplateMenu()
            this.DBask('SELECT * FROM templates where id = ?', [id]).then(result=>{
                let theTemplate = result.rows.item(0)
                this.currentTemplate = theTemplate
                this.DBask('SELECT * FROM exercises where id in (SELECT exercise FROM templates_exercises where template =?) order by id', [id]).then(result=>{
                    let exercises = []
                    for(let i = 0; i < result.rows.length; i++){
                        exercises.push(result.rows.item(i))
                    }
                    this.tasks = exercises
                    this.MakePreview()
                },error=>{
                    console.log(error)
                }) 
                
            },error=>{
                console.log(error)
            }) 
        },






                    // CRUD for subjects



                    inputSubjectName(event) {
                        this.newSubjectName = event.target.value            
                    },
            
                    addNewSubject() {
            
                        let main = (txt)=>{
                            db = openDatabase("TWP4", "0.1", "TWP test database", 20000);
                            if(db) {
                                console.log('The database has been connected')
                                db.transaction(function(tx) {
                                    tx.executeSql("INSERT INTO subjects (name) VALUES (?)", [txt], function(result){
                                        
                                    }, function(tx, error){alert('error')});
                                    });
                            } 
                            else {console.log('ERROR! The database has not been connected!'); return;} 
                        }
                        main(this.newSubjectName)
                    },
            
                    deleteSubject(idx){
                        if(confirm('Удалить предмет?')){
                            let main = (id)=>{
                                db = openDatabase("TWP4", "0.1", "TWP test database", 20000);
                                if(db) {
                                    db.transaction(function(tx) {
                                        tx.executeSql("DELETE FROM subjects WHERE ID = (?)", [id], function(result){
                                        }, function(tx, error){alert('Ошибка БД при удалении предмета!')});
                                        });
                                } 
                                else {alert('ERROR! The database has not been connected!'); return;} 
                            }
                            main(idx)
                        }
                        
                    },

//                          Other options

        testMethod(){

            
            MathJax.typesetPromise().then(()=>{
                console.log('Typeseted!')
            })
        },

        createTable() {
            db = openDatabase("TWP4", "0.1", "TWP test database", 20000);
            if(db) {
                console.log('The database has been connected')
                db.transaction(function(tx) {
                    tx.executeSql("CREATE TABLE users_groups (ID Integer PRIMARY KEY AUTOINCREMENT, usr integer, grp integer)", [], function(result){alert('ok!')}, function(tx, error){alert('error')});
                    });
            } 
            else {console.log('ERROR! The database has not been connected!'); return;}
        },
    }
}

Vue.createApp(WorkEditor).mount('#bars')
