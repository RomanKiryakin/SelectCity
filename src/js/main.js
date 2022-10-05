(function () {
    window.onload = function() {
        document.querySelector('.search').oninput = function (){
            let val = this.value.trim();
            let searchItem = document.querySelectorAll('.header__city-list li');
            if (val !== ''){
                searchItem.forEach(function (elem){
                    let position =  elem.innerText.search(val);
                    if (position === -1){
                        elem.classList.add('hidden');
                        elem.innerHTML = elem.innerText;
                    }
                    else{
                        elem.classList.remove('hidden');
                        let str = elem.innerText;
                        elem.innerHTML = insertMark(str,position, val.length)
                    }
                });
            }
            else{
                searchItem.forEach(function (elem){
                    elem.classList.remove('hidden');
                    elem.innerHTML = elem.innerText;
                });
            }
        }
        function insertMark(lightCount, pos, len){
            return lightCount.slice(0, pos) + '<mark>' + lightCount.slice(pos, pos + len) + '</mark>' + lightCount.slice(pos + len)
        }

        document.querySelector('.drop-block').onclick = function() {
            document.getElementById('header__city-search').classList.toggle('visible');
        }

        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'https://studika.ru/api/areas');
        xhr.send();

        let preloader = document.querySelector('.header__city-preloader');
        preloader.classList.remove('hidden');
        let cityes = {};
        document.querySelector("#saveButton").disabled = true;
        xhr.onload = function (){
            if (xhr.status === 200){
                cityes = JSON.parse(xhr.response);
                 // console.log(JSON.parse(xhr.response));
                const list = document.querySelector('.header__city-list');
                for (let city of cityes) {
                    const newItem = document.createElement('li');
                    newItem.textContent = city.name;
                    newItem.classList = 'cityClass';
                    list.append(newItem);
                }
                preloader.classList.add('hidden');
            }

            let cityArray = document.getElementsByClassName("cityClass"); // all li
            let listContainer = document.querySelector('#selected');   //main div
            let lowers ={};
            let count;
            for (let i=0; i < cityArray.length; i++) {
                cityArray[i].onclick = function(){

                    lowers = document.querySelectorAll("#selected div");
                    let selectedCity = document.createElement('div'); // Создает див
                    selectedCity.textContent = this.textContent; // Пихает туда текст от ли
                    selectedCity.className = this.textContent; // Пихает туда класс
                    listContainer.append(selectedCity); // Добавляет в ДОМ
                    console.log("add"+selectedCity.textContent);
                    count = document.querySelectorAll("#selected div");
                    for (let lower of lowers){
                        if (lower.className === this.textContent){
                                console.log("udalil"+lower.textContent);
                                listContainer.removeChild(selectedCity);
                                lower.remove();
                        }else {
                            console.log("ne udalil"+lower.textContent);
                        }
                    }
                    count = document.querySelectorAll("#selected div");
                    console.log(count.length);

                    if( count.length > 0){
                       document.querySelector("#saveButton").disabled = false;
                       console.log('disabled');
                    }else{
                        document.querySelector("#saveButton").disabled = true;
                    }

                    let closeStikers = document.querySelectorAll('#selected div');
                    console.log(closeStikers);
                    for (closeStiker of closeStikers){
                        closeStiker.onclick = function() {
                            console.log('Удалил стикер'+ this);
                            this.remove();
                        }
                    }


                    // this.classList.toggle('bgc');
                }
            }


        }




            document.querySelector('#saveButton').onclick = function() {
            let saveBages = document.querySelectorAll("#selected div");
            let saveCities = document.querySelector("#saveCities");
            saveCities.textContent = '';
            for( saveBage of saveBages){
                console.log(saveBages.length)
                if(saveBages.length > 1){
                    saveCities.textContent += saveBage.textContent+ ', ';
                }else{
                    saveCities.textContent += saveBage.textContent;
                }
            }
        }
        xhr.onerror = function (event){
            console.log(event);
        }

    }
})();


