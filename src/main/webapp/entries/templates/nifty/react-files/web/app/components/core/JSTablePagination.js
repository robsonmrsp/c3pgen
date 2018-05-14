import React from 'react'
import { Pagination } from "react-bootstrap";

export default class JSTablePagination extends React.Component {

    constructor(props) {
        super(props);
        this.totalItems = this.props.totalItems || 185;
        this.pageSize = this.props.pageSize || 10;
        this.totalNumPages = Math.round((this.totalItems / this.pageSize) + 1);
        this.numPages = 10;


        this.actualPage = this.props.actualPage || 1;


        this.state = {
            activeButtomItemNumber: 1,
            firstVisiblePage: 1
        }
    }
    onClickPrevItemHandler = (event) => {
        const prev = this.state.activeButtomItemNumber > 1 ? this.state.activeButtomItemNumber - 1 : 1;
        if (this.state.activeButtomItemNumber > 1) {
            this.onClickItemHandler(prev);
        }
    }
    onClickNextItemHandler = (event) => {

        const firstVisiblePage = this.state.firstVisiblePage;

        const next = this.state.activeButtomItemNumber < this.totalNumPages ? this.state.activeButtomItemNumber + 1 : this.numPages;

        if (next > (10 * (this.state.firstVisiblePage))) {
            this.setState({
                firstVisiblePage: firstVisiblePage + 1
            })
        }
        if (this.state.activeButtomItemNumber < this.totalNumPages) {
            this.onClickItemHandler(next);
        }
    }

    onClickFirstItemHandler = (event) => {

        this.setState({
            firstVisiblePage: 1
        })
        this.onClickItemHandler(1);
    }

    onClickLastItemHandler = (event) => {
        this.setState({
            firstVisiblePage: Math.round(this.totalNumPages / 10)
        })

        this.onClickItemHandler(this.totalNumPages);
    }
    onClickItemHandler = (itemNumber) => {
        this.setState({ activeButtomItemNumber: itemNumber });
        if (this.props.onPaginate) {
            this.props.onPaginate(itemNumber)
        }
    }


    render = () => {
        // pra melhorar mais ainda...vai ser necessário "apagar" os botões que não deveriam existir e estão sendo desenhados... 
        // Exemplo: são 19 paginas ele ele gera até o ultimo botão
        // console.log("totalItems " + this.props.totalItems);
        // console.log("page " + this.props.page);
        // console.log("pageSize " + this.props.pageSize);

        // console.log("this.state.firstVisiblePage " + this.state.firstVisiblePage);
        // console.log("this.state.activeButtomItemNumber " + this.state.activeButtomItemNumber);

        const activeButtomItemNumber = this.state.activeButtomItemNumber;

        const firstPage = this.props.page === 1 ? 1 : this.state.firstVisiblePage;

        const items = Array.from(new Array(this.numPages), (x, i) => (10 * (firstPage - 1)) + i + 1)
        this.totalNumPages = Math.round((this.props.totalItems / this.props.pageSize) + 1);

        // console.log("const items" + items);
        // console.log("this.totalNumPages " + this.totalNumPages);
        return (
            <Pagination>
                <Pagination.First onClick={(event) => this.onClickFirstItemHandler(event)} />
                <Pagination.Prev onClick={(event) => this.onClickPrevItemHandler(event)} />

                {items.map(item => {
                    if (item <= this.totalNumPages) {
                        return (<Pagination.Item key={item} active={item === this.props.page} onClick={(event) => this.onClickItemHandler(item, event)}>{item}</Pagination.Item>)
                    }
                    return null;
                })}

                <Pagination.Next onClick={(event) => this.onClickNextItemHandler(event)} />
                <Pagination.Last onClick={(event) => this.onClickLastItemHandler(event)} />
            </Pagination>
        )
    }
}
