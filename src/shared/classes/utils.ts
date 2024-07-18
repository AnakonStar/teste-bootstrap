import { JwtHelperService } from '@auth0/angular-jwt';
import moment from 'moment';
import Swal, { SweetAlertIcon } from 'sweetalert2';
import { environment } from '../../enviroments/enviroment';

declare var $: any;

export type datatableConfig = {
  busca?: boolean;
  btnEditar?: boolean;
  token: string;
  rota: any;
  hashId: string;
  tabelaId: string;
  colunas: any[];
  telaEditar: string;
  baseUrl: string;
};

export default class Utilitarios {
  //static spinner = new NgxSpinnerService();

  public static FormatarDataUTC(
    data: string | Date,
    hora: number,
    min: number,
    seg: number
  ) {
    const dataMoment = moment(data).format('YYYY-MM-DD');

    const dia = moment(dataMoment).get('date');
    const mes = moment(dataMoment).get('month');
    const ano = moment(dataMoment).get('year');

    return new Date(Date.UTC(ano, mes, dia, hora, min, seg));
  }

  public static RemoverTimezone(data: Date) {
    return new Date(data.valueOf() - data.getTimezoneOffset() * 60000);
  }

  static StrongPasswordRegx: RegExp =
    /^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{8,}$/;

  static GravarSessionStorage(chave: string, conteudo: string) {
    sessionStorage.setItem(chave, conteudo);
  }

  static ObterSessionStorage(chave: string) {
    return sessionStorage.getItem(chave);
  }

  static GravarToken(token: string) {
    localStorage.setItem('tokenJWT', token);
  }

  static ConvertIntToBool(numero: number) {
    return !!numero;
  }

  static ObterToken() {
    return localStorage.getItem('tokenJWT');
  }

  static GravarEmpresa(empresa: any) {
    localStorage.setItem('empresa', JSON.stringify(empresa));
  }

  // static ObterEmpresa(): Empresa | null {
  //   const empresa = localStorage.getItem('empresa');

  //   if(!empresa) return null;

  //   return JSON.parse(empresa);
  // }

  static ConfirmaAcao(
    titulo: string,
    texto: string,
    tipo: SweetAlertIcon,
    showCancelButton: boolean,
    confirmButtonText: string,
    cancelButtonText: string
  ) {
    return Swal.fire({
      title: titulo,
      text: texto,
      icon: tipo,
      showCancelButton: showCancelButton,
      confirmButtonText: confirmButtonText,
      cancelButtonText: cancelButtonText,
    });
  }

  static rowClickHandler(
    data: any,
    colunaId: string,
    router: any,
    rota: string
  ) {
    router.navigate([rota + '/' + data[colunaId]]);
  }

  static FiltrosCarregar(modulo: string): any {
    var ret;

    ret = localStorage.getItem('filtros_' + modulo);

    if (ret) {
      ret = JSON.parse(ret);
    } else {
      ret = null;
    }

    return ret;
  }

  static FiltrosMemorizar(modulo: string, filtros_pesquisa: any) {
    localStorage.setItem('filtros_' + modulo, JSON.stringify(filtros_pesquisa));
  }

  static validarCPF(cpf: string) {
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf == '') return false;
    // Elimina CPFs invalidos conhecidos
    if (
      cpf.length != 11 ||
      cpf == '00000000000' ||
      cpf == '11111111111' ||
      cpf == '22222222222' ||
      cpf == '33333333333' ||
      cpf == '44444444444' ||
      cpf == '55555555555' ||
      cpf == '66666666666' ||
      cpf == '77777777777' ||
      cpf == '88888888888' ||
      cpf == '99999999999'
    )
      return false;
    // Valida 1o digito
    let add = 0;
    for (let i = 0; i < 9; i++) add += parseInt(cpf.charAt(i)) * (10 - i);
    let rev = 11 - (add % 11);
    if (rev == 10 || rev == 11) rev = 0;
    if (rev != parseInt(cpf.charAt(9))) return false;
    // Valida 2o digito
    add = 0;
    for (let i = 0; i < 10; i++) add += parseInt(cpf.charAt(i)) * (11 - i);
    rev = 11 - (add % 11);
    if (rev == 10 || rev == 11) rev = 0;
    if (rev != parseInt(cpf.charAt(10))) return false;
    return true;
  }

  static validaCNPJ(cnpj: string) {
    var b = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    var c = String(cnpj).replace(/[^\d]/g, '');

    if (c.length !== 14) return false;

    if (/0{14}/.test(c)) return false;

    for (var i = 0, n = 0; i < 12; n += +c[i] * b[++i]);
    if (+c[12] != ((n %= 11) < 2 ? 0 : 11 - n)) return false;

    for (var i = 0, n = 0; i <= 12; n += +c[i] * b[i++]);
    if (+c[13] != ((n %= 11) < 2 ? 0 : 11 - n)) return false;

    return true;
  }

  static validaEmail(email?: string | null) {
    if (!email) return true;

    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  static paginacao(dados: any[], pagina: number, tamanhoPagina: number) {
    const retorno = [];
    let ini = 0;
    let fim = 0;

    if (pagina > 0) {
      pagina = pagina / tamanhoPagina + 1;
    } else {
      pagina = 1;
    }

    if (pagina > 1) {
      fim = pagina * tamanhoPagina;
      ini = fim - tamanhoPagina + 1;
    } else {
      ini = 1;
      fim = tamanhoPagina;
    }

    for (let i = ini; i <= fim; i++) {
      if (dados[i - 1]) {
        retorno.push(dados[i - 1]);
      }
    }

    return retorno;
  }

  static resizeDataTable() {
    const dataTableInstance = $('#dataTable-component').DataTable();

    if (dataTableInstance) {
      setTimeout(() => {
        dataTableInstance.columns.adjust();
      }, 400);
    }
  }

  static pegarDiaSemana(diaNumero: string): string | undefined {
    switch (diaNumero) {
      case '1':
        return 'Domingo';
      case '2':
        return 'Segunda-feira';
      case '3':
        return 'Terça-feira';
      case '4':
        return 'Quarta-feira';
      case '5':
        return 'Quinta-feira';
      case '6':
        return 'Sexta-feira';
      case '7':
        return 'Sábado';
      default:
        return '';
    }
  }

  static ObterPayload(param: string): any {
    const token = this.ObterToken();

    if (!token) return null;

    const helper = new JwtHelperService();
    const data = helper.decodeToken(token);

    return data != null ? data[param] : null;
  }

  // static ObterUsuario(): Usuario | null {
  //   const data =  localStorage.getItem('usuario');

  //   return data != null ? JSON.parse(data).usuario : null;
  // }

  static groupBy(list: any, keyGetter: any) {
    const map = new Map();
    list.forEach((item: any) => {
      const key = keyGetter(item);
      const collection = map.get(key);
      if (!collection) {
        map.set(key, [item]);
      } else {
        collection.push(item);
      }
    });
    return map;
  }

  static DatePickerTornarCampo(campo: string, filtros: any) {
    const datas = filtros.data.replace(' ', '').split('|');

    $(document).ready(() => {
      $(campo).daterangepicker(
        {
          startDate: moment(datas[0], 'YYYY-MM-DD').format('DD/MM/YYYY'),
          endDate: moment(datas[1], 'YYYY-MM-DD').format('DD/MM/YYYY'),
          autoApply: true,
          ranges: {
            Hoje: [moment(), moment()],
            'Últimos 7 dias': [moment().subtract(6, 'days'), moment()],
            'Este mês': [moment().startOf('month'), moment().endOf('month')],
            'Mês passado': [
              moment().subtract(1, 'month').startOf('month'),
              moment().subtract(1, 'month').endOf('month'),
            ],
            // 'Remover data': ['', '']
          },
          locale: {
            format: 'DD/MM/YYYY',
            separator: ' - ',
            applyLabel: 'OK',
            cancelLabel: 'Cancelar',
            fromLabel: 'de',
            toLabel: 'até',
            customRangeLabel: 'Personalizar',
            weekLabel: 'W',
            daysOfWeek: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
            monthNames: [
              'Janeiro',
              'Fevereiro',
              'Março',
              'Abril',
              'Maio',
              'Junho',
              'Julho',
              'Agosto',
              'Setembro',
              'Outubro',
              'Novembro',
              'Dezembro',
            ],
            firstDay: 1,
          },
          alwaysShowCalendars: true,
        },
        (start, end, label) => {
          filtros.data =
            start.format('YYYY-MM-DD') + '|' + end.format('YYYY-MM-DD');
        }
      );
    });
  }

  static DataTablesInicializar({
    btnEditar,
    token,
    rota,
    tabelaId,
    baseUrl,
    hashId,
    telaEditar,
    colunas,
  }: datatableConfig) {
    if (btnEditar !== false) {
      colunas.unshift({
        render: function (data, type, row, meta) {
          var link = `<a class='lnkLinha'><i class='fas fa-edit'></i></a>`;
          return link;
        },
      });
    }

    $(`#${tabelaId}`).DataTable({
      paging: true,
      processing: true,
      ajax: {
        url: environment.urlApi + baseUrl,
        type: 'POST',
        data: function (d) {
          d.usuarioNome = '';
          return d;
        },
        dataFilter: function (data) {
          var json = $.parseJSON(data);

          return JSON.stringify(json); // return JSON string
        },
        beforeSend: function (request) {
          request.setRequestHeader('Authorization', `Bearer ${token}`);
        },
      },
      rowCallback: (row: Node, data, index: number) => {
        const self = this;

        var lnkEdicao = $('td', row).find('.lnkLinha');

        lnkEdicao.unbind('click');
        lnkEdicao.bind('click', () => {
          self.rowClickHandler(data, `${hashId}`, rota, `${telaEditar}`);
        });

        $("input[type='checkbox']", row).attr('idRegistro', data[`${hashId}`]);

        return row;
      },
      ordering: false,
      destroy: true,
      serverSide: true,
      columns: colunas,
      language: {
        lengthMenu: 'Mostrar _MENU_ registros por página',
        zeroRecords: 'Nada encontrado',
        info: 'Mostrando página _PAGE_ de _PAGES_',

        infoFiltered: '(filtrado de _MAX_ registros no total)',
        paginate: {
          first: 'Primeiro',
          last: 'Último',
          next: 'Próximo',
          previous: 'Anterior',
        },
      },
      order: [[1, 'desc']],
      stateSave: true,
      searching: false,
    });
  }
}
