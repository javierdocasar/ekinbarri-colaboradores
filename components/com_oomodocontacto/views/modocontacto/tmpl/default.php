<?php // no direct access
// TODO: Actualizar Template
defined('_JEXEC') or die('Restricted access');
$entity = "pais"
?>
<section class="list">
    <div class="header">
        <h3>Empresas<span class="info" id="textSearch"></span></h3>
        <nav id="nav-actions" class="data nav-actions">
            <ul>
                <!--<li class="search-list" ><button id="openFilter">Filtrar</button></li>-->
                <li class="search-list"><button id="openSearch">Buscar</button></li>
                <li class="config-list"><button id="openConfig">Configurar</button></li>
                <li class="export"><button id="export">Exportar</button></li>
                <li class="new"><button id="new">Nuevo</button></li>
            </ul>
        </nav>
    </div>
    <div class="content">
        <iframe id="frameDownload" style="display:none"></iframe>
        <div class="data list-search" >
            <form id="search-form" method="post">

                <div class="form-element">
                    <label for="search_activo">Activo</label>
                    <select data-field="activo" data-type="=" data-serialize="true" name="search_activo" id="search_activo">
                        <option value="">Todos</option>
                        <option value="1">Sí</option>
                        <option value="0">No</option>
                    </select>
                </div>

                <div class="footer">
                    <button id="clean" class="delete">Borrar</button>
                    <button id="search" class="filter">Filtrar</button>
                </div>
            </form>
        </div>
        <div class="data info-list-search hidden"></div>
        <nav id="nav-filter" class="data nav-filter">
            <ul>
                <li class="active" data-filter='todos'><a href="#">Todos</a></li>
                <li class="" data-filter='filter1'><a href="#">Activos</a></li>
                <li class="" data-filter='filter2'><a href="#">Inactivos</a></li>
            </ul>
        </nav>
        <section id="mon-totals" class="monitor" >
            <dl class="important">
                <dt>Todos</dt>
                <dd id="total_todos">—</dd>
            </dl>
            <dl class="ok">
                <dt>Activos</dt>
                <dd id="total_filter1">—</dd>
            </dl>
            <dl class="warning">
                <dt>Inactivos</dt>
                <dd id="total_filter2">—</dd>
            </dl>

        </section>
        <nav id="nav-pager" class="data nav-pager hidden">
            <div class="footable-pagination-wrapper">
                <ul class="pagination">
                    <li class="footable-page-nav prev" data-page="prev"><a class="footable-page-link" href="#">‹</a></li>
                    <li class="footable-page-nav next" data-page="next"><a class="footable-page-link" href="#">›</a></li>
                </ul>
                <span class="label label-default"></span>
            </div>
        </nav>
        <div class="data list-config">
            <form id="config-form" method="post">
            </form>
        </div>
        <!--<table id="tableData" class="data" data-paging="false" data-sorting="true" data-paging-size="50" data-paging-container=".nav-pager" data-paging-limit="0" data-paging-count-format="{CP} de {TP}"></table>-->
        <div id="tableData" class="rtable"></div>
    </div>
</section>
<section class="detail">
    <form id="formData" method="post">
        <nav class="nav-actions">
            <ul>
                <li class="remove"><button type="button" id="delete">Eliminar</button></li>
                <li class="save"><button type="button" id="save">Guardar</button></li>
                <li class="close"><button type="button" id="close">Cerrar</button></li>
            </ul>
        </nav>
        <div class="header">
            <h1>Nuevo Detalle</h1>
        </div>
        <fieldset>
            <legend>Datos Generales</legend>
            <div class="form-element checkbox">
                <input data-serialize="true" data-field="activo" type="checkbox" data-value="prop" data-params="checked" name="activo" id="activo">
                <label for="activo">Activo</label>
            </div>
            <div class="form-element">
                <label class="mandatory" for="pais">Código</label>
                <input data-serialize="true" data-field="codigo" type="text" name="codigo" id="codigo" placeholder="Código" required/>
            </div>
            <div class="form-element">
                <label class="mandatory" for="empresa">Empresa</label>
                <input data-serialize="true" data-field="empresa" type="text" name="empresa" id="empresa" placeholder="Empresa" required/>
            </div>

            <div class="form-element">
                <label class="mandatory" for="acronimo">Acrónimo</label>
                <input data-serialize="true" data-field="acronimo" type="text" name="acronimo" id="acronimo" placeholder="Acrónimo" required/>
            </div>
        </fieldset>
        <fieldset>
            <legend>Contactos</legend>
            <div class="form-element">
                <label for="observaciones">Observaciones</label>
                <textarea rows="8" cols="50" data-field="observaciones" data-serialize="true"  name="observaciones" id="observaciones"></textarea>
            </div>
            <div class="form-element off">
                <label  for="created_at">Creado</label>
                <input  data-field="created_at" type="text" name="created_at" id="created_at" placeholder=""/>
            </div>
            <div class="form-element off">
                <label  for="upated_at">Actualizado</label>
                <input  data-field="updated_at" type="text" name="updated_at" id="updated_at" placeholder=""/>
            </div>
        </fieldset>
        <fieldset>
            <legend>Gestiones</legend>
            <div class="form-element">
                <label for="observaciones">Observaciones</label>
                <textarea rows="8" cols="50" data-field="observaciones" data-serialize="true"  name="observaciones" id="observaciones"></textarea>
            </div>
            <div class="form-element off">
                <label  for="created_at">Creado</label>
                <input  data-field="created_at" type="text" name="created_at" id="created_at" placeholder=""/>
            </div>
            <div class="form-element off">
                <label  for="upated_at">Actualizado</label>
                <input  data-field="updated_at" type="text" name="updated_at" id="updated_at" placeholder=""/>
            </div>
        </fieldset>


        <input type="hidden" data-field="id" name="id" id="id" value = "0"/>
    </form>
</section>


