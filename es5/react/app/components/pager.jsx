import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
// нужно 
// кол-во всего страниц
// текущая страница
// урл шаблон куда поставлять страницу
// что еще в этом урле нужно не понтяно как пробросить
/*
<a class="page-link" href="#" tabindex="-1">&#60;</a>

 disabled
*/

function* jsxLoop (from, to, callback){
        for(var i = from; i <= to; ++i)
            yield callback(i);
}

export default class Pager extends React.Component {
    constructor(props) {
        super(props);
    }

    
    render() {
        const { page, count, urlTemplate } = this.props;
        
        return (
            <nav>
                <ul class="pagination justify-content-end">
                    <li class="page-item">
                        <NavLink to={urlTemplate.replace(/{page}/gi, page - 1)} className="page-link">&#60;</NavLink>
                    </li>
                    {[...jsxLoop(1, count, i =>
                        <li class="page-item">
                            <NavLink to={urlTemplate.replace(/{page}/gi, i)} activeClassName="nav-link active" className="page-link">{i}</NavLink>
                        </li>
                    )]}
                    <li class="page-item">
                    {page != }
                        <NavLink to={urlTemplate.replace(/{page}/gi, page + 1)} className="page-link">&#62;</NavLink>
                    </li>
                </ul>
            </nav>
        );
    }
}
