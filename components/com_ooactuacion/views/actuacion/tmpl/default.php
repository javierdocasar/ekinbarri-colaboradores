<?php // no direct access
// TODO: Actualizar Template
defined('_JEXEC') or die('Restricted access');
$entity = "pais"
?>
<section class="list">
    <div class="header">
        <h3>Actuaciones<span class="info" id="textSearch"></span></h3>
        <nav id="nav-actions" class="data nav-actions">
            <ul>
                <li class="search-list"><button id="openSearch">Buscar</button></li>
                <li class="config-list"><button id="openConfig">Configurar</button></li>
                <!--<li class="export"><button id="export">Exportar</button></li>-->
                <!--<li class="new"><button id="new">Nuevo</button></li>-->
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
                <dt>Nº Actuaciones</dt>
                <dd id="total_todos">—</dd>
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
        <div id="tableData" class="rtable"></div>
    </div>
</section>
<section class="detail">
    <form id="formData" method="post">
        <nav class="nav-actions">
            <ul>
               <!-- <li class="remove"><button type="button" id="delete">Eliminar</button></li>
                <li class="save"><button type="button" id="save">Guardar</button></li>-->
                <li class="close"><button type="button" id="close">Cerrar</button></li>
            </ul>
        </nav>
        <div class="header">
            <h1>Actuación</h1>
        </div>
        <fieldset>
            <legend>Datos Generales</legend>
            <div class="form-element disabled">
                <label class="mandatory" for="consultor">Consultor</label>
                <input data-serialize="true" data-field="consultor" type="text" name="consultor" id="consultor" placeholder="Consultor" />
            </div>
            <div class="form-element disabled">
                <label class="mandatory" for="empresa">Empresa</label>
                <input data-serialize="true" data-field="empresa" type="text" name="empresa" id="empresa" placeholder="Empresa" />
            </div>
            <div class="form-element disabled">
                <label class="mandatory" for="contacto">Contacto</label>
                <input data-serialize="true" data-field="contacto" type="text" name="contacto" id="contacto" placeholder="Contacto" />
            </div>
            <div class="form-element compo serialize-datetime disabled">
                <label for="fecha_date" class="group-label mandatory">Fecha</label>
                <div class="form-element span-2">
                    <label for="fecha_date">Fecha</label>
                    <a href='#' class='action seldate' tabindex='-1'>Abrir</a>
                    <input type="text" value="" data-field="fecha_date"  data-datetime="fecha"  name="fecha_date" id="fecha_date" placeholder="dd/mm/yyyy" class="dateES mDate"/>
                </div>
                <div class="form-element span-2">
                    <label for="fecha_time">Hora</label>
                    <a href='#' class='action seltime' tabindex='-1'>Abrir</a>
                    <input value="" type="text"  data-field="fecha_time"  data-datetime="fecha"  name="fecha_time" id="fecha_time" placeholder="hh:mm" class="time mTime"/>
                </div>
                <input type="hidden" value="" data-serialize="true" data-field="fecha" name="fecha" id="fecha"/>
            </div>
            <div class="form-element disabled">
                <label class="mandatory" for="modo_contacto">Contacto</label>
                <input data-serialize="true" data-field="modo_contacto" type="text" name="modo_contacto" id="modo_contacto" placeholder="Contacto" />
            </div>
            <div class="form-element disabled">
                <label for="observaciones">Observaciones</label>
                <textarea rows="8" cols="50" data-field="observaciones" data-serialize="true"  name="observaciones" id="observaciones"></textarea>
            </div>
        </fieldset>
        <input type="hidden" data-field="id" name="id" id="id" value = "0"/>
    </form>
</section>


