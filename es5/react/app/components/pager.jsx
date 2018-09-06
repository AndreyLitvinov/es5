import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';

function* jsxLoop (from, to, callback){
        for(var i = from; i <= to; ++i)
            yield callback(i);
}

export default class Pager extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        const { page, count, size, urlTemplate } = this.props;
        const pageCount = Math.ceil(count/size);
        const currentCenter = 4 > page ? 4 : page > pageCount - 3 ? pageCount - 3 : page;
        return (
            <nav>
                {pageCount < 11 ?
                <ul class="pagination justify-content-end">

                    <li class={ !page || page == 1 ? 'page-item disabled' : 'page-item'} >
                        <NavLink to={urlTemplate.replace(/{page}/gi, page - 1)} className="page-link">&#60;</NavLink>
                    </li>
                    {[...jsxLoop(1, pageCount, i =>
                        <li class="page-item">
                            <NavLink to={urlTemplate.replace(/{page}/gi, i)} activeClassName="nav-link active" className="page-link">{i}</NavLink>
                        </li>
                    )]}
                    <li class={ !pageCount || page == pageCount ? 'page-item disabled' : 'page-item'} >
                        <NavLink to={urlTemplate.replace(/{page}/gi, +page + 1)} className="page-link">&#62;</NavLink>
                    </li>
                </ul>
                :                 
                <ul class="pagination justify-content-end">
                    <li class="page-item">
                        <NavLink to={urlTemplate.replace(/{page}/gi, 1)} activeClassName="nav-link active" className="page-link">1</NavLink>
                    </li>
                    <li class="page-item">
                        <NavLink to={urlTemplate.replace(/{page}/gi, 2)} activeClassName="nav-link active" className="page-link">2</NavLink>
                    </li>

                    {currentCenter > 4 &&
                    <li class="page-item">
                        <NavLink to={urlTemplate.replace(/{page}/gi, currentCenter - 3)} activeClassName="nav-link active" className="page-link">...</NavLink>
                    </li>}

                    {currentCenter > 2  &&
                    <li class="page-item">
                        <NavLink to={urlTemplate.replace(/{page}/gi, currentCenter - 1)} activeClassName="nav-link active" className="page-link">{currentCenter - 1}</NavLink>
                    </li>}

                    <li class="page-item">
                            <NavLink to={urlTemplate.replace(/{page}/gi, currentCenter)} activeClassName="nav-link active" className="page-link">{currentCenter}</NavLink>
                    </li>

                    {pageCount - 2 > currentCenter &&
                    <li class="page-item">
                        <NavLink to={urlTemplate.replace(/{page}/gi, +currentCenter + 1)} activeClassName="nav-link active" className="page-link">{+currentCenter + 1}</NavLink>
                    </li>}

                    {pageCount - 3 > currentCenter &&
                    <li class="page-item">
                        <NavLink to={urlTemplate.replace(/{page}/gi, +currentCenter + 3)} activeClassName="nav-link active" className="page-link">...</NavLink>
                    </li>}

                    <li class="page-item">
                        <NavLink to={urlTemplate.replace(/{page}/gi, pageCount - 1)} className="page-link">{pageCount - 1}</NavLink>
                    </li>
                    <li class="page-item">
                        <NavLink to={urlTemplate.replace(/{page}/gi, pageCount)} className="page-link">{pageCount}</NavLink>
                    </li>
                </ul>}
            </nav>
        );
    }
}
