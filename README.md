frontend
========

This Repo will containt what is going to be uploaded to the server

<h3>At this moment there are the following folders:</h3>

<p>css</p>
<p>font-awesome-4.1.0</p>
<p>js</p>


<h3>The list of files are:</h3>

<p> HOME es la pantalla principal. En ella se cargan los diferents html. Solo hay un controller llamado homeController
donde hay todos los metodos implementados.
</p>

<h3>Missing in the whole project</h3>
<p>Tener las URL des del el web service para poder hacer CRUD de flujos.</p>
<p>Mostrar las graficas de lidia</p>
<p>Implementar Login</p>


<mark>This is old</mark>
<p>
<h4>pestaña_clients:</h4> This is the L1 clients window. Here L1 can add/delete companies, and add L2 administrators. This file requires js/controllerClientes.js as a controller. <b>MISSING:</b> Nothing
</p>
<p>
<h4>pestaña_nodes: </h4> THis window shows all nodes sorted by company. This window allows to add another node to an specific node. This file requires js/controllerClientes.js as a controller. <b>MISSING:</b> Nothing
<p>
<h4>login: </h4>aquí hay el login. Le he añadido funcionalidades angular respecto a lo que hizo Rafael. <b>MISSING</b> Gestionar las respuestas que vienen del server: 600 si el usuario no existe o 400 si password es incorrecto
</p>
<p>
<h4>Pantalla Principal:</h4> Esta pantalla tiene funcionalidades angular respecto a la primera version que hizo rafael. <b>MISSING</b> Incluir el resto de paginas en las "tab" ya definidas mediante bind-data-html... aun asi no funciona
