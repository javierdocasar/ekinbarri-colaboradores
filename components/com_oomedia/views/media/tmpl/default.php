<?php // no direct access
defined('_JEXEC') or die('Restricted access'); ?>
<section class="list">
    <div class="header">
    	<h3>Multimedia</h3>
        <nav class="data nav-actions">
            <ul>
                <li id="delete-media"><button class="remove">Eliminar</button></li>
                <li id="new-folder"><button class="edit">Crear Carpeta</button></li>
                <li id="new-file"><button class="upload">Subir imagen</button></li>
            </ul>
        </nav>
    </div>
    <div class="content">
    	<div class="data list-search">
    	</div>
    	<div class="list-edit">
            <form id="searchForm" method="post">
                <div class="form-element">
                    <label for="folder">Carpeta</label>
                    <input type="text" name="folder" id="folder" placeholder="" class=""/>
                    <button type="button" id="create-folder">Crear</button>
                </div>
            </form>
            <form id="uploaForm" method="post">
                <div class="form-element">
                    <input type="file" name="image-upload" id="image-upload" placeholder="" class=""/>
                </div>
            </form>
        </div>
        <div id="media" class="content">
            <nav class="bc">
<!--                <a class="level">images</a>-->
<!--                <a class="level">web</a>-->
<!--                <span class="level last">conocenos</span>-->
            </nav>
            <ul id="mediaselector" class="imagenes thumbs">
            </ul>
        </div>
    </div>
</section>

