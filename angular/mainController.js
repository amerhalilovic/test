var app = angular.module("moviesapp", []);

app.controller("mainController", async function ($scope, $http, $timeout) {
    $scope.createModal = false;

    getMovies($http, $scope)

    $scope.toggleCreate = function (movie) {
        if (movie) {
            $scope.movie = movie;
        } else $scope.movie = {}
        $scope.createModal = !$scope.createModal;
    }

    $scope.editMovie = function (movie) {
        console.log(movie);
        $http({
            method: 'PUT',
            url: '/api/movie/' + movie._id,
            data: JSON.stringify(movie)
        }).then(function successCallback(response) {
            $scope.success = true;
            $scope.successText = "Movie Edited Successfully"
            $timeout(function () {
                $scope.success = false;
            }, 5000);
            $scope.createModal = false;
        }, function errorCallback(response) {
            console.log(response)
        });
    }

    $scope.addMovie = function (movie) {
        $http({
            method: 'POST',
            url: '/api/movie',
            data: JSON.stringify(movie)
        }).then(function successCallback(response) {
            $scope.movies.push(response.data)
            $scope.success = true;
            $scope.successText = "Movie Added Successfully"
            $timeout(function () {
                $scope.success = false;
            }, 5000);
            $scope.createModal = false;
        }, function errorCallback(response) {
            console.log(response)
        });
    }

    $scope.deleteMovie = function (id, index) {
        console.log(id, index);
        $http({
            method: 'DELETE',
            url: '/api/movie/' + id
        }).then(function successCallback(response) {
            $scope.movies.splice(index, 1);
            $scope.success = true;
            $scope.successText = "Movie Deleted Successfully"
            $timeout(function () {
                $scope.success = false;
            }, 5000);
        }, function errorCallback(response) {
            console.log(response)
        });
    }

});

const getMovies = async function ($http, $scope) {
    $http({
        method: 'GET',
        url: '/api/movie'
    }).then(function successCallback(response) {
        $scope.movies = response.data;
    }, function errorCallback(response) {
        console.log(response)
        $scope.movies = [];
    });
}