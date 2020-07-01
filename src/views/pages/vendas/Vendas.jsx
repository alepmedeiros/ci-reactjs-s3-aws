import React from "react";
// react component that copies the given text inside your clipboard
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  Container,
  Button,
  Row,
  UncontrolledDropdown,
  Badge,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  Table,
  Pagination,
  PaginationItem,
  PaginationLink,
  CardFooter,
  Col
} from "reactstrap";
// core components
import HeaderGeneric from "components/Headers/HeaderGeneric";
import api from '../../../services/api';

class Vendas extends React.Component {
  state = {
    _vendas: [],
    paginas: 0,
    total: 0,
    atualpage: 1,
    periodo : 0,
    getVendas : this.getVendas(),
  };
  //interval = null;
  //getVendas = this.getVendas.bind(this);

  componentDidMount() {
      const getdatainterval = this.getVendasReload.bind(this);
    setInterval(getdatainterval, 30000);
    this.getVendas(1, 0);
  }

  getDateFindInit(days) {
    let newDate = new Date() ;
    newDate.setDate(newDate.getDate() - days); 
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    let datatot = year + '-' + month + '-' + date + ' 00:00:00';
    return datatot;


  }

  getDateFindFinal(days) {
    let newDate = new Date() ;
    newDate.setDate(newDate.getDate() - days); 
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    let datatot = year + '-' + month + '-' + date + ' 23:59:59';
    return datatot;
  }

  getVendasReload() {
    api.get('/webhook/1?limit=10&page=1&initialdate='+this.getDateFindInit(0)+'&finaldate='+this.getDateFindFinal(0), { 'headers': { 'X-Paginate': 'true' } })
    .then(response => {
        this.setState({ _vendas: response.data.docs });
        this.setState({ paginas: response.data.pages });
        this.setState({ total: response.data.total });
        this.setState({ atualpage : 1 });
    });
}

  getVendas(page, periodo) {
    api.get('/webhook/1?limit=10&page='+page+'&initialdate='+this.getDateFindInit(periodo)+'&finaldate='+this.getDateFindFinal(0), { 'headers': { 'X-Paginate': 'true' } })
    .then(response => {
        this.setState({ _vendas: response.data.docs });
        this.setState({ paginas: response.data.pages });
        this.setState({ total: response.data.total });
        this.setState({ atualpage : page });
    });
    
  }

  

  FormaPagamento(value) {
    if (value === 1) {
      return (<span>Boleto Bancário</span>);
    }

    if (value === 9) {
      return (<span>PayPal</span>);
    }

    if (value === 0) {
      return (<span>Desconhecido</span>);
    }

    if (value === 11) {
      return (<span>Gratuito</span>);
    }


    if (value === 13) {
      return (<span>Visa</span>);
    }

    if (value === 14) {
      return (<span>Amex</span>);
    }

    if (value === 15) {
      return (<span>MasterCard</span>);
    }

    if (value === 16) {
      return (<span>Diners</span>);
    }

    if (value === 17) {
      return (<span>Débito Banco do Brasil</span>);
    }

    if (value === 18) {
      return (<span>Débito Bradesco</span>);
    }

    if (value === 19) {
      return (<span>Débito Itaú</span>);
    }

    if (value === 21) {
      return (<span>HiperCard</span>);
    }

    if (value === 22) {
      return (<span>Débito Banrisul</span>);
    }

    if (value === 23) {
      return (<span>Hiper</span>);
    }

    if (value === 24) {
      return (<span>Elo</span>);
    }

    if (value === 25) {
      return (<span>PayPal Internacional</span>);
    }

    if (value === 27) {
      return (<span>Múltiplos Cartões</span>);
    }
  }

  ItemStatus(value) {
    if (value === 1) {
      return (<Badge color="" className="badge-dot mr-4">
        <i className="bg-primary" />
                Aberta
      </Badge>);
    }

    if (value === 3) {
      return (<Badge color="" className="badge-dot mr-4">
        <i className="bg-success" />
                Paga
      </Badge>);
    }

    if (value === 4) {
      return (<Badge color="" className="badge-dot mr-4">
        <i className="bg-secondary" />
                Cancelada
      </Badge>);
    }

    if (value === 6) {
      return (<Badge color="" className="badge-dot mr-4">
        <i className="bg-danger" />
                Aguardando Reembolso
      </Badge>);
    }

    if (value === 7) {
      return (<Badge color="" className="badge-dot mr-4">
        <i className="bg-danger" />
                Reembolsado
      </Badge>);
    }

    if (value === 9) {
      return (<Badge color="" className="badge-dot mr-4">
        <i className="bg-info" />
                Duplicada
      </Badge>);
    }

    if (value === 10) {
      return (<Badge color="" className="badge-dot mr-4">
        <i className="bg-secondary" />
                Expirada
      </Badge>);
    }

    if (value === 11) {
      return (<Badge color="" className="badge-dot mr-4">
        <i className="bg-warning" />
                Recuperação
      </Badge>);
    }

    if (value === 15) {
      return (<Badge color="" className="badge-dot mr-4">
        <i className="bg-default" />
                Aguardando Pagamento
      </Badge>);
    }
  }

  renderRow(row){
    return (
    <PaginationItem className="">
      <PaginationLink
        href="#"
        onClick={() => this.getVendas(row, this.state.periodo)}
      >
      {row}
    </PaginationLink>
  </PaginationItem>)
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
    this.getVendas(1, event.target.value);
  }

  render() {
    let rows = []
    for(let i=0; i<this.state.paginas; i++){
      rows.push(i+1)
    }

    
    return (
      <>
        <HeaderGeneric />
        {/* Page content */}
        <Container className=" mt--7" fluid>
          {/* Table */}
          <Row>
            <div className=" col">
              <Card className=" shadow">
                <CardHeader className=" bg-transparent">
                  <Row>
                    <Col xs='1'>
                      <h3 className=" mb-0">Vendas ({this.state.total})</h3>
                    </Col>
                    <Col>
                    
                    <select name="periodo" onChange={this.handleChange}>
                      <option value="0">Hoje</option>
                      <option value="7">7 Dias</option>
                      <option value="30">30 Dias</option>
                      <option value="60">60 Dias</option>
                      <option value="90">3 Meses</option>
                      <option value="180">6 Meses</option>
                      <option value="365">1 Ano</option>
                      <option value="1825">5 Ano</option>
                      <option value="36500">Todo o Período</option>
                    </select>

                    
                  
                    </Col>
                    <div className="col text-right">
                      <Button
                        color="primary"
                        href="#"
                        onClick={() => this.getVendas(1, this.state.periodo)}
                        size="sm"
                      >
                        Atualizar
                      </Button>
                    </div>
                  </Row>
                  
                  
                </CardHeader>
                <CardBody>
                  <Table className="align-items-center table-flush" responsive>
                    <thead className="thead-light">
                      <tr>
                        <th scope="col">Data Criação</th>
                        <th scope="col">Status</th>
                        <th scope="col">Cliente</th>
                        <th scope="col">Telefone</th>
                        <th scope="col">Produto</th>
                        <th scope="col">Valor</th>
                        <th scope="col">Forma de Pagamento</th>
                        <th scope="col">Plataforma</th>
                        <th scope="col" />
                      </tr>
                    </thead>
                    <tbody>
                      {(this.state._vendas || []).map(venda => (
                        <tr key={venda.ID} >
                          <th scope="row">
                            {venda.trans_createdate}
                            <br></br>
                            {venda.trans_createtime}
                          </th>
                          <td >
                            {this.ItemStatus(venda.trans_status)}

                          </td>
                          
                          <td >
                            {venda.cus_name}
                            <br></br>
                            {venda.cus_email}
                          </td>
                          <td >
                            <a
                              href={`https://api.whatsapp.com/send?phone=55${venda.cus_cel}`}
                              target="blank"
                            >
                              {venda.cus_cel}
                            </a>

                          </td>
                          <td >
                          {venda.product_name.substring(0, 50)}
                            <br></br>
                        ({venda.product_cod})
                      </td>
                          <td >
                            R$ {venda.trans_value}
                          </td>
                          <td >
                            {this.FormaPagamento(venda.trans_paymentmethod)}
                          </td>
                          <td >
                            {venda.WebHookcol}
                          </td>


                          <td className="text-right">
                            <UncontrolledDropdown>
                              <DropdownToggle
                                className="btn-icon-only text-light"
                                href="#pablo"
                                role="button"
                                size="sm"
                                color=""
                                onClick={e => e.preventDefault()}
                              >
                                <i className="fas fa-ellipsis-v" />
                              </DropdownToggle>
                              <DropdownMenu className="dropdown-menu-arrow" right>
                                <DropdownItem
                                  href="#pablo"
                                  onClick={e => e.preventDefault()}
                                >
                                  Action
                            </DropdownItem>
                                <DropdownItem
                                  href="#pablo"
                                  onClick={e => e.preventDefault()}
                                >
                                  Another action
                            </DropdownItem>
                                <DropdownItem
                                  href="#pablo"
                                  onClick={e => e.preventDefault()}
                                >
                                  Something else here
                            </DropdownItem>
                              </DropdownMenu>
                            </UncontrolledDropdown>
                          </td>
                        </tr>
                      ))}


                    </tbody>
                  </Table>
                </CardBody>
                <CardFooter className="py-4">
                  
                  <nav aria-label="...">
                    <Pagination
                      className="pagination justify-content-end mb-0"
                      listClassName="justify-content-end mb-0"
                    >
                      
                      <PaginationItem className="">
                        <PaginationLink
                          href="#"
                          onClick={() => this.getVendas(this.state.atualpage-1, this.state.periodo)}
                          tabIndex="-1"
                        >
                          <i className="fas fa-angle-left" />
                          <span className="sr-only">Previous</span>
                        </PaginationLink>
                      </PaginationItem>
                      
                      <PaginationItem>
                        <PaginationLink
                          href="#"
                          onClick={() => this.getVendas(this.state.atualpage+1, this.state.periodo)}
                        >
                          <i className="fas fa-angle-right" />
                          <span className="sr-only">Next</span>
                        </PaginationLink>
                      </PaginationItem>
                    </Pagination>
                  </nav>
                </CardFooter>
              </Card>
            </div>
          </Row>
        </Container>
      </>
    );
  }
}

export default Vendas;
