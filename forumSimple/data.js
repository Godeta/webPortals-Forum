/**
 * Notre tableau de threads en JSON avec 2 exemples
 */
var defaultThreads = [
    {
        id: 1,
        title: "Thread A",
        author: "Aaron",
        date: Date.now(),
        content: "Thread content",
        comments: [
            {
                author: "Jack",
                date: Date.now(),
                content: "Salut bg"
            },
            {
                author: "Arthur",
                date: Date.now(),
                content: "Bonjour"
            }
        ]
    },
    {
        id: 2,
        title: "Thread 2",
        author: "Aaron",
        date: Date.now(),
        content: "Thread content",
        comments: [
            {
                author: "Jack",
                date: Date.now(),
                content: "Salut bg"
            },
            {
                author: "Arthur",
                date: Date.now(),
                content: "Bonjour"
            }
        ]
    }

]

/**
 * Affiche en html les infos de base des différents threads stockés pour la page d'index 
 */
function printThreadIndex() {
    let container = document.querySelector('ol');
    for (let thread of threads) {
        var html = `
        <li class="row">
        <a href="thread.html?${thread.id}">
        <h4 class="title">
            ${thread.title}
        </h4>
        <div class="bottom">
            <p class="timestamp"> 
                ${new Date (thread.date).toLocaleDateString()}
            </p>
            <p class="comment-count">
                ${thread.comments.length} comments
            </p>
        </div>
    </a>
    </li>`;
    container.insertAdjacentHTML('beforeend',html);
    }
}

/**
 * Affiche en html les détails d'un thread pour thread.html 
 */
function printThreadInfos() {
    console.log(threads);
    // on enlève le "?" pour récupérer uniquement l'id
    let id = window.location.search.slice(1);
    //la fonction find renvoie le premier élement qui satisfait la condition de la fonction passée en paramètres
    //ici on a mis une arrow function équivalent de return t.id==id
    let thread = threads.find(t => t.id == id);
    console.log(thread);
    let header = document.querySelector('.header');
    // ajout de l'entête
    let html = `
    <h4 class="title">
    ${thread.title}
</h4>
<div class="bottom">
    <p class="timestamp"> 
    ${new Date (thread.date).toLocaleDateString()}
    </p>
    <p class="comment-count">
    ${thread.comments.length} comments
    </p>
</div>`;
    header.insertAdjacentHTML('beforeend',html);

    // ajout des commentaires
    
    for (let comment of thread.comments) {
        addComment(comment);
    }
}

/**
 * Function qui ajoute un commentaire, utilisée pour l'affichage des threads et actualiser l'affichage de un seul
 * quand on en ajoute un avec le boutton
 * @param {*} comment 
 */
function addComment(comment) {
    let comments = document.querySelector('.comments');
    let html = `
        <div class="comments">
        <div class="comment">
            <div class="top-comment">
                <p class="user"> 
                    ${comment.author}
                </p>
                <p class="timestamp">
                    ${new Date (comment.date).toLocaleDateString()}
                </p>
            </div>
            <div class="comment-content">
                ${comment.content}
            </div>
        </div>
    </div>`;
    comments.insertAdjacentHTML('beforeend',html);
}

/**
 * On défini notre tableau de threads, si il existe dans la base locale alors
 *  on récupère celui là sinon on utilise celui par défaut. LocalStorage ne peut contenir que des string.
 */
let threads;
if(localStorage && localStorage.getItem('threads')) {
    threads = JSON.parse(localStorage.getItem('threads'));
}
else {
    threads = defaultThreads;
    localStorage.setItem('threads',JSON.stringify(defaultThreads));
}

/**
 * Cette partie permet à notre boutton add comment dans thread.html d'ajouter un commentaire dans notre base
 */
let btn = document.querySelector('button');
btn.addEventListener('click', function(){
    let txt =document.querySelector('textarea');
    let comment = {
        content: txt.value,
        date: Date.now(),
        author: 'Truc'
    }
    addComment(comment);
    txt.value = '';
    thread.comments.push(comment);
    localStorage.setItem('threads', JSON.stringify(thread));
})