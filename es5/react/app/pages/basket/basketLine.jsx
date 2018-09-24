import React from 'react';
import { UserComponent } from '../../components/authorization';

export default class BasketLine extends React.Component {
    constructor(props) {
        super(props);
        
        const { line } = this.props;
        this.state = {
            count: line.count,
            timer: null
        }

        this.plusBookToBasketClick = this.plusBookToBasketClick.bind(this);
        this.minusBookFromBasketClick = this.minusBookFromBasketClick.bind(this);
        this.removeBookFromBasketClick = this.removeBookFromBasketClick.bind(this);
    }

    startTimerSave(count) {
        const { update, line } = this.props;
        const { timer } = this.state;

        if(timer) clearTimeout(timer);
        if(update && (count >= 1 && count <= line.maxCount))
            this.setState({ timer : setTimeout(() => update(Object.assign(line, { count })), 1000) });
    }

    plusBookToBasketClick(){
        let { count: currentCount } = this.state;
        this.handlerCountChange(++currentCount);
    }

    minusBookFromBasketClick(){
        let { count: currentCount } = this.state;
        this.handlerCountChange(--currentCount);
    }

    removeBookFromBasketClick(){
        const { remove, line } = this.props;
        const { count } = this.state;
        if(remove)
            remove(Object.assign(line, { count }));
    }

    handlerCountChange(count){
        const { changed, line } = this.props;
        this.setState({ count });
        this.startTimerSave(count);

        if(changed){
            changed(Object.assign(line, { count }));
        }
    }

    contChange(e) {
        const { value } = e.target;
        this.handlerCountChange(value);
    }

    render() {
        const { line } = this.props;
        const { count } = this.state;
        const isUpdating = !!line.updating; //5.y
        return (
            <tr scope="row">
                <td>
                    {line.title}
                </td>
                <UserComponent>
                    <td>
                        <div className="btn-group btn-group-sm" role="group">
                            <input type="number" value={count} onChange={(e) => this.contChange(e)} className="form-control" disabled={isUpdating}></input>
                            <button type="button" onClick={this.minusBookFromBasketClick} style={{display:'inline'}}  className="btn btn-outline-success" disabled={isUpdating || count < 2}><i class="fas fa-minus-square"></i></button>
                            <button type="button" onClick={this.plusBookToBasketClick} style={{display:'inline'}} className="btn btn-outline-success" disabled={isUpdating || count >= line.maxCount}><i class="fas fa-plus-square"></i></button>
                        </div>
                        <div className="d-flex pt-2">
                            { (count < 1 || count > line.maxCount) && <div class="alert alert-danger">Значение должно быть в диапазоне от 1 до { line.maxCount }, данные не будут сохранены.</div>}
                        </div>
                    </td>
                    <td>
                        <button type="button" onClick={this.removeBookFromBasketClick} style={{display:'inline'}} className="btn btn-outline-danger" disabled={isUpdating}><i class="fas fa-trash-alt"></i></button>
                    </td>
                </UserComponent>
            </tr>
        );
    }
}