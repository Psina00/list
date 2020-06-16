const server = 'http://localhost:80/'
var app = angular.module('myApp',[]);
app.controller('ctrl', function ($scope,$http) {
    $http({
        url: server,
        method: "GET",
        params: {"actionType": "r"},
    }).then((data) => {
        $scope.itemId = Object.keys(data.data.dat);
        $scope.namesItems = data.data.dat;
    });
    $scope.addItem = function () {
        let inputItem = document.getElementById('add').value;
        $http({
            url: server,
            method: "GET",
            params: {"actionType": "c", "item": inputItem},
        }).then((data) => {
            $scope.itemId = data.data;
            $scope.namesItems[data.data] = inputItem;
        });
    };
    $scope.removeItem = function (event) {
        let ItemId = event.target.parentElement.parentElement.id;
        $http({
            url: server,
            method: "GET",
            params: {"actionType": "d", "id": ItemId},
        }).then((data) => {
            document.getElementById(`${data.data}`).remove();
        });
    }
    $scope.editItem = function (event) {
        let idEl = event.target.parentElement.parentElement.id;
        let subj = document.getElementById(`${idEl}`);
        let textBefore = subj.firstElementChild.textContent;
        subj.firstElementChild.innerHTML = `<input type="text" value="${textBefore}" class="elDiff" id="edit ${idEl}">`;
        document.addEventListener('keydown', (e) => {
            if ((document.getElementById(`edit ${idEl}`).value != '') && (e.key === 'Enter')){
                let newText = document.getElementById(`edit ${idEl}`).value;
                $http({
                    url: server,
                    method: "GET",
                    params: {"actionType": "u", "id": idEl, "item": newText},
                }).then(() => {
                    subj.firstElementChild.innerHTML = newText;
                });
            }
        })
    }
});
