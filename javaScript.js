    //DEFINICION DE VARIABLES
    let time = 50;
    let movimiento = 20;
    let movementBar = 20;
    let width = document.documentElement.clientWidth - movimiento; 
    let height = document.documentElement.clientHeight - movimiento; 
    let controlGame; 
    let player1; 
    let player2;

    //INICIO DEL JUEGO
    function start(){ 
        init();
        controlGame = setInterval(play, time); 
        document.body.style.background = "white"; 
    }
    //CONTROLES DE INICIO DEL JUEGO
    function init(){ 
        ball.style.left = 0; 
        ball.state = 1; 
        ball.direction = 1; 
        player1 = new Object(); 
        player2 = new Object();
        player1.keyPress = false; 
        player1.keyCode = null;
        player2.keyPress = false;
        player2.keyCode = null;
    }
    //FUNCION DE PARAR EL JUEGO CUANDO PIERDA
    function stop(){ 
        clearInterval(controlGame); 
        document.body.style.background = "Red"; 
        
    }
    //FUNCIONALIDAD DEL JUEGO
    function play(){ 
        moveBall();
        moveBar();
        checkIfLost();
    }
    //CONDICION PARA PERDER
    function checkIfLost(){
        if(ball.offsetLeft >= width){
            stop();
            alert("PUNTO PARA PLAYER 1");
            
        }
        if(ball.offsetLeft <= 5){
            stop();
            alert("PUNTO PARA PLAYER 2");
        }
    }
    //MOVIMIENTO DE LA PELOTA Y DEFINICION DE LOS ESTADOS
    function moveBall(){ 
        checkStateBall();
        switch(ball.state){
            case 1: //derecha, abajo
                ball.style.left = (ball.offsetLeft + movimiento) +"px"; 
                ball.style.top = (ball.offsetTop + movimiento) +"px"; 
                break;
            case 2: // derecha, arriba
                ball.style.left = (ball.offsetLeft + movimiento) +"px"; 
                ball.style.top = (ball.offsetTop - movimiento) +"px"; 
                break;
            case 3: // izquierda, abajo
                ball.style.left = (ball.offsetLeft - movimiento) +"px"; 
                ball.style.top = (ball.offsetTop + movimiento) +"px"; 
                break;
            case 4: // izquierda, arriba
                ball.style.left = (ball.offsetLeft - movimiento) +"px"; 
                ball.style.top = (ball.offsetTop - movimiento) +"px"; 
                break;
        } 
    }
    //DETECTAR EL ESTADO DE LA PELOTA
    function checkStateBall(){ 

        if(collidePlayer2()){
            ball.direction = 2; 
            if(ball.state == 1) ball.state = 3; 
            if(ball.state == 2) ball.state = 4; 
        }else if(collidePlayer1()){ 
            ball.direction = 1;
            if(ball.state == 3) ball.state = 1; 
            if(ball.state == 4) ball.state = 2; 
        }
        
        if(ball.direction ===1){
            if(ball.offsetTop >= height) ball.state=2; 
            else if(ball.offsetTop <=0 ) ball.state=1; 
        }else{                                          
            if(ball.offsetTop >= height) ball.state=4; 
            else if(ball.offsetTop <=0 ) ball.state=3; 
        }
    }
    //CHOQUE DE LA BOLA CON LA BARRA 1 
    function collidePlayer1(){
        if(ball.offsetLeft <= (bar1.clientWidth) && 
           ball.offsetTop >= bar1.offsetTop && 
           ball.offsetTop <= (bar1.offsetTop + bar1.clientHeight)){ 
            return true; 
        }

        return false;
    }
    //CHOQUE DE LA BOLA CON LA BARRA 2
    function collidePlayer2(){
        if(ball.offsetLeft >= (width-bar2.clientWidth) &&
           ball.offsetTop >= bar2.offsetTop &&
           ball.offsetTop <= (bar2.offsetTop + bar2.clientHeight)){
            return true;
        }
        return false;

    }
    //MOVIMIENTO DE LAS BARRAS (PLAYERS)
    function moveBar(){ 
        if(player1.keyPress){ 
            if(player1.keyCode == 81 && bar1.offsetTop >=0) 
                bar1.style.top = (bar1.offsetTop - movementBar) + "px"; 
            if(player1.keyCode == 65 && (bar1.offsetTop + bar1.clientHeight)<=height)
                bar1.style.top = (bar1.offsetTop + movementBar) + "px";
            
        }
        if(player2.keyPress){ 
            if(player2.keyCode == 79 && bar2.offsetTop>=0)
                bar2.style.top = (bar2.offsetTop - movementBar) +"px";
            if(player2.keyCode == 76 && (bar2.offsetTop + bar2.clientHeight)<=height) 
                bar2.style.top = (bar2.offsetTop + movementBar) +"px";
        } 
    }
    //DETECCION DE LA TECLA PRESIONADA
    document.onkeydown = function(e){ 
        e = e || window.event; 
        switch(e.keyCode){ 
            case 81: 
            case 65: 
                player1.keyCode = e.keyCode;
                player1.keyPress = true; 
            break;
            case 79: 
            case 76: 
                player2.keyCode = e.keyCode;
                player2.keyPress = true;
            break;
        }
    }

    //DETECCION DE LA TECLA QUE SE DEJA DE PRESIONAR
    document.onkeyup = function(e){
        if(e.keyCode == 81 || e.keyCode == 65) 
            player1.keyPress = false;
        if(e.keyCode == 79 || e.keyCode == 76) 
            player2.keyPress = false;
    } 

    start();
