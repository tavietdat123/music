const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const h2 = $('header h2')
const cdthumb = $('.cd-thumb')
const audio = $('#audio')
const btnplaying = $('.btn-toggle-play')
const player = $('.player')
const progress = $('#progress')
const nextbtn = $('.btn-next')
const prevbtn = $('.btn-prev')
const random = $('.btn-random')
const repeat = $('.btn-repeat')
const song = $('.song')
const played = $('.playlist')
const volum = $('#volum')

const DATXZ = "datxz2003"


const app = {
    currentindex: 0,
    playing: false,
    random: false,
    isrepeat:false,
    config: JSON.parse(localStorage.getItem(DATXZ)) || {}
    ,
    setConfig:function (key,value){
        this.config[key] = value
        localStorage.setItem(DATXZ,JSON.stringify(this.config))
    }
    ,
    song: [{
            name: 'Nghe như tình yêu',
            singer: 'HIEUTHUHAI',
            path: '/music/y2mate.com - HIEUTHUHAI  Nghe Như Tình Yêu prod by Kewtiie  Official Lyric Video.mp3',
            image: '/img/artworks-e1mdrcieaHZPFUTf-pNjScw-t500x500.jpg',

        }, {
            name: 'Chạy ngay đi',
            singer: 'Sơn Tùng MTP',
            path: '/music/y2mate.com - CHẠY NGAY ĐI ONIONN REMIX RUN NOW ONIONN REMIX  SƠN TÙNG MTP  Official Music Video.mp3',
            image: '/img/tải xuống.jpg',
        },
        {
            name: 'All for love',
            singer: 'All for love',
            path: '/music/y2mate.com - Tungevaag  Raaban  All For Love.mp3',
            image: '/img/all for love.jpg',

        }, {
            name: 'Tonight',
            singer: 'HIEUTHUHAI',
            path: '/music/y2mate.com - LyricsVietsub Lambert x Demxntia  Tonight.mp3',
            image: '/img/tonight.jpg',

        }, {
            name: 'Bật nhạc lên',
            singer: 'HIEUTHUHAI',
            path: '/music/y2mate.com - Bật Nhạc Lên.mp3',
            image: '/img/bat nhac len.jpg',

        }, {
            name: 'Arcane',
            singer: 'HIEUTHUHAI',
            path: '/music/y2mate.com - Imagine Dragons  JID  Enemy from the series Arcane League of Legends  Official Music Video.mp3',
            image: '/img/arcane.jpg',

        },
        {
            name: 'Arcane meow',
            singer: 'HIEUTHUHAI',
            path: '/music/y2mate.com - Imagine Dragons x JID  Enemy cover by Bongo Cat .mp3',
            image: '/img/meowww.jpg',

        },
        {
            name: 'Astronaut x Somebody',
            singer: 'HIEUTHUHAI',
            path: '/music/y2mate.com - Astronaut x Somebody That I Used To Know x Im Not Angry Anymore Lyrics  Vietsub  TikTok .mp3',
            image: '/img/astrou.jpg',

        },
        {
            name: 'Shots',
            singer: 'HIEUTHUHAI',
            path: '/music/y2mate.com - Shots  Imagine Dragons  Broiler Remix Lyrics  Vietsub .mp3',
            image: '/img/shots.jpg',

        },
        {
            name: 'Rise',
            singer: 'HIEUTHUHAI',
            path: '/music/y2mate.com - Nightcore  Rise Lyrics.mp3',
            image: '/img/rise.jpg',

        },


    ],
    defineProperties: function() {
        Object.defineProperty(this, 'currentsong', {
            get: function() {
                return this.song[this.currentindex]
            }
        })
    },
    loadcurrentsong: function() {
        h2.innerText = this.currentsong.name
        cdthumb.style.backgroundImage = `url('${this.currentsong.image}')`
        audio.src = this.currentsong.path
        

    },
    loadconfig:function(){
        this.random = this.config.random
        this.isrepeat = this.config.isrepeat
       
    }
    ,
    render: function() {
        const html = this.song.map((song,index) => {
            return `
                <div class="song ${(this.currentindex === index) ? "active" : ''}" data-index ='${index}'>
                <div class="thumb" style="background-image: url('${song.image}')" >
                </div>
                <div class="body">
                    <h3 class="title">${song.name}</h3>
                    <p class="author">${song.singer}</p>
                </div>
                <div class="option">
                    <i class="fas fa-ellipsis-h"></i>
                </div>
            </div>

            `;
        })
        played.innerHTML = html.join('')
    },
    nextsong: function() {
        this.currentindex++
            if (this.currentindex >= this.song.length) {
                this.currentindex = 0
            }
        this.loadcurrentsong()
    },
    prevsong: function() {
        this.currentindex--
            if (this.currentindex <= 0) {
                this.currentindex = this.song.length - 1
            }
        this.loadcurrentsong()
    },
    randomsong: function(){
        do{
           var newcurentindex = Math.floor(Math.random() * this.song.length)
        }while(this.currentindex === newcurentindex)
    
        this.currentindex = newcurentindex
        this.loadcurrentsong()
    },
    srollsong: function(){
        setTimeout(()=>{
            $('.song.active').scrollIntoView({
                behavior: "smooth", block: "nearest", inline: "nearest"
            })
            
        },300)
        
    }
    ,
    handel: function() {
        const cd = $('.cd')
        const cdh = cd.offsetWidth

        const cdthumbanimate = cdthumb.animate(
            [{
                transform: 'rotate(360deg)'
            }], {
                duration: 15000,
                iterations: Infinity
            }
        )
        cdthumbanimate.pause()

        window.onscroll = function() {
            const scr = window.scrollY || document.documentElement.scrollTop
            const newscr = cdh - scr
            cd.style.width = newscr < 0 ? 0 : newscr + "px"
            cd.style.opacity = newscr / cdh
        }
        btnplaying.onclick = function() {
            if (app.playing) {
                audio.pause()
            } else {
                audio.play()
                app.srollsong()
            }
        }
        audio.onplay = function() {
            app.playing = true
            player.classList.add('playing')
            cdthumbanimate.play()

        }
        audio.onpause = function() {
            app.playing = false
            player.classList.remove('playing')
            cdthumbanimate.pause()

        }
        audio.ontimeupdate = function() {
            var pecent = audio.currentTime / audio.duration * 100
            if (pecent) {
                progress.value = pecent

            }


        }
        progress.onchange = function(e) {
            const seek = audio.duration / 100 * e.target.value
            audio.currentTime = seek
        }
        nextbtn.onclick = function() {
            if(app.random){
                app.randomsong()
                audio.play()
                
            }else{
                app.nextsong()
                audio.play()
            }
            app.render()
            app.srollsong()

        }
        prevbtn.onclick = function() {
            if(app.random){
                app.randomsong()
                audio.play()
                
            }else{
                app.prevsong()
                audio.play()
            }
            app.render()
            app.srollsong()


        }
        random.onclick = function() {
            app.random = !app.random
             app.setConfig('random',app.random)

            random.classList.toggle('active', app.random)
        }
        repeat.onclick = function() {
            app.isrepeat = !app.isrepeat
            app.setConfig('isrepeat',app.isrepeat)

            repeat.classList.toggle('active', app.isrepeat)
        }

        audio.onended = function (){
            if(app.isrepeat){
               audio.play()
            }else{
                nextbtn.onclick()
            }

        }         
        played.onclick = function (e){
            const newsong = e.target.closest('.song:not(.active)')
            if(newsong && !e.target.closest('.option')){
               if(newsong){
                app.currentindex = Number(newsong.dataset.index)
               app.loadcurrentsong()
               audio.play()
               app.render()
               
            }
            if(e.target.closest('.option')){

            }
        }
            
        }
       volum.value =  audio.volume * 100 

        volum.onchange = function(e){
            audio.volume =  e.target.value /100
        }
        
    },
  
    start: function() {
        this.loadconfig()
        this.defineProperties()
        this.loadcurrentsong()

        this.render();
        this.handel()
        random.classList.toggle('active', app.random)
        repeat.classList.toggle('active', app.isrepeat)

    }
}

app.start()
