(function (angular) {

  'use strict';
  var miAgenda = angular.module("miAgenda", ["ngSanitize"]);

})(window.angular);

(function (angular) {
  'use strict';

  function contactsController($scope) {

    $scope.link = "http://www.outlook.com";
    $scope.target = "_blank";


    $scope.AgregarContacto = function (event) {

      $scope.agenda = $scope.agenda || [];
      $scope.agenda.push({
        nombres: $scope.nombres,
        apellidos: $scope.apellidos,
        email: $scope.email,
        telefono: $scope.telefono,

      });
      $scope.LimpiarCampos(event);
    };

    $scope.LimpiarCampos = function (event) {
      if (event) {
        event.preventDefault();
      }
      $scope.nombres = "liona";
      $scope.apellidos = "";
      $scope.email = "";
      $scope.telefono = "";

    };

    $scope.SendEmail = function (mail) {
      var link = "mailto:" + mail;
      window.location.href = link;
    };

    $scope.EliminarContacto = function (contacto) {
      var pos = $scope.agenda.indexOf(contacto);
      var contactos = $scope.agenda;
      pos > -1 && contactos.splice(pos, 1);
      $scope.agenda = contactos;
    };


  }

  angular.module("miAgenda")
    .controller("contactsController", contactsController);

})(window.angular);


$('th').click(function () {
  var table = $(this).parents('table').eq(0)
  var rows = table.find('tr:gt(0)').toArray().sort(comparer($(this).index()))
  this.asc = !this.asc
  if (!this.asc) {
    rows = rows.reverse()
  }
  for (var i = 0; i < rows.length; i++) {
    table.append(rows[i])
  }
  setIcon($(this), this.asc);
})

function comparer(index) {
  return function (a, b) {
    var valA = getCellValue(a, index),
      valB = getCellValue(b, index)
    return $.isNumeric(valA) && $.isNumeric(valB) ? valA - valB : valA.localeCompare(valB)
  }
}

function getCellValue(row, index) {
  return $(row).children('td').eq(index).html()
}

function setIcon(element, asc) {
  $("th").each(function (index) {
    $(this).removeClass("sorting");
    $(this).removeClass("asc");
    $(this).removeClass("desc");
  });
  element.addClass("sorting");
  if (asc) element.addClass("asc");
  else element.addClass("desc");
}







// Initialize Firebase

var vm = new Vue({
  el: "#app",
  data: {
    nombre: "",
    apellidos: "",
    fnacimiento: "",
    telefono: "",
    colorNombre: ""
  },
  firebase: {
    refContactos: db.ref("Contactos"),
    refRaiz: db.ref()
  },
  methods: {
    Agregar: function () {
      db.ref("Contactos/" + this.nombre + this.telefono).set({ Nombre: this.nombre, Apellidos: this.apellidos, Fnacimiento: this.fnacimiento, Telefono: this.telefono })
    },
    Eliminar: function (event) {
      var id = event.target.id
      db.ref("Contactos/" + id).remove()
    },
    eliminarTodos: function () {
      db.ref("Contactos").remove()

    }
  },
  computed: {
    todosContactos: function () {
      for (var algo of this.refRaiz) {
        delete algo[".key"]
        console.log(algo)
      }
      return Object.keys(this.refContactos).length
    },
    nombreError: function () {
      return { 'has-error': !(this.nombre.length > 5) }
    },
    mostrarBoton: function () {
      return this.nombre && this.apellidos && this.fnacimiento && this.telefono && this.nombre.length > 5
    }
  },
  filters: {
    capitalize: function (value) {

      return value.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      });
    }
  },
  watch: {
    nombre: function () {
      var azar1 = Math.round(Math.random() * 255) + 1;
      var azar2 = Math.round(Math.random() * 255) + 1;
      var azar3 = Math.round(Math.random() * 255) + 1;
      this.colorNombre = "rgb(" + azar1 + "," + azar2 + "," + azar3 + ")"
    }
  }
})





function buildTable() {
  addLineToHTMLTable("Juan", "Hernandez");
  addLineToHTMLTable("Marie-Claire", "Pérez");
  addLineToHTMLTable("Julián", "Alvarez");
  addLineToHTMLTable("Pastor", "Contreras");
  addLineToHTMLTable("Claudia", "Miranda");
}

// Add a line to the HTML table
function addLineToHTMLTable(firstName, lastName) {
  // Get the body of the table using the selector API
  var tableBody = document.querySelector("#tableContactBody");

  // Add a new row at the end of the table
  var newRow = tableBody.insertRow();

  // add  new cells to the row
  var firstNameCell = newRow.insertCell();
  firstNameCell.innerHTML = firstName;

  var lastNameCell = newRow.insertCell();
  lastNameCell.innerHTML = lastName;
  lastNameCell.style.color = "pink";

  newRow.insertCell().innerHTML = "12345879";
  newRow.insertCell().innerHTML = "❤️";
}










function TodoCtrl($scope) {
  
  $scope.todos = [
    {text:'Learn AngularJS', done:false},         
    {text: 'Build an app', done:false}
  ];
  
  $scope.getTotalTodos = function () {
    return $scope.todos.length;
  };
  
  
  $scope.addTodo = function () {
    $scope.todos.push({text:$scope.formTodoText, done:false});
    $scope.formTodoText = '';
  };
  
    $scope.clearCompleted = function () {
        $scope.todos = _.filter($scope.todos, function(todo){
            return !todo.done;
        });
    };
}