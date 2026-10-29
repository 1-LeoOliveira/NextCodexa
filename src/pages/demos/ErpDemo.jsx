import { useState, useMemo, useEffect } from 'react'
import {
  LayoutDashboard, ReceiptText, Package, Wallet, Users, Search, Bell, Menu,
  Plus, Download, TrendingUp, Target, AlertTriangle, ClipboardList, Percent
} from 'lucide-react'
import BarraModelo from '../../components/BarraModelo.jsx'
import { brl } from '../../config.js'
import { SERIES } from '../../lib/graficos.js'
import { DADOS, INDICADORES, PERIODOS } from './erp/dados.js'
import { GraficoCombo, Rosca, MapaCalor, Funil, MiniGrafico } from './erp/Graficos.jsx'
import '../../styles/demo-erp.css'

/* ---------------- dados de demonstracao ---------------- */

const MODULOS = [
  { id: 'dashboard', nome: 'Dashboard', Icone: LayoutDashboard },
  { id: 'pedidos', nome: 'Pedidos', Icone: ReceiptText },
  { id: 'estoque', nome: 'Estoque', Icone: Package },
  { id: 'financeiro', nome: 'Financeiro', Icone: Wallet },
  { id: 'clientes', nome: 'Clientes', Icone: Users }
]

const TOP_PRODUTOS = [
  { nome: 'Kit Instalação Premium', vendas: 312, receita: 148600 },
  { nome: 'Cabo Flex 4mm (rolo)', vendas: 268, receita: 96400 },
  { nome: 'Módulo Controlador X2', vendas: 194, receita: 87300 },
  { nome: 'Sensor de Presença IR', vendas: 151, receita: 52900 },
  { nome: 'Fonte Estabilizada 12V', vendas: 118, receita: 34200 }
]

const PEDIDOS = [
  { id: '#10482', cliente: 'Construtora Horizonte', data: '28/10/2026', itens: 14, valor: 28450.0, status: 'Pago' },
  { id: '#10481', cliente: 'Mercado São Jorge', data: '28/10/2026', itens: 6, valor: 4320.9, status: 'Em produção' },
  { id: '#10480', cliente: 'Elétrica Ribeiro ME', data: '27/10/2026', itens: 22, valor: 15890.0, status: 'Entregue' },
  { id: '#10479', cliente: 'Pousada Bela Vista', data: '27/10/2026', itens: 3, valor: 2180.5, status: 'Pendente' },
  { id: '#10478', cliente: 'Auto Peças Centro', data: '26/10/2026', itens: 9, valor: 7640.0, status: 'Pago' },
  { id: '#10477', cliente: 'Clínica Vida Plena', data: '26/10/2026', itens: 5, valor: 3410.0, status: 'Cancelado' },
  { id: '#10476', cliente: 'Padaria Trigo de Ouro', data: '25/10/2026', itens: 11, valor: 6125.4, status: 'Entregue' },
  { id: '#10475', cliente: 'Transportes Aliança', data: '25/10/2026', itens: 18, valor: 21380.0, status: 'Em produção' }
]

const ESTOQUE = [
  { sku: 'PRD-1042', nome: 'Kit Instalação Premium', cat: 'Kits', qtd: 148, min: 60, custo: 212.4 },
  { sku: 'PRD-2210', nome: 'Cabo Flex 4mm (rolo 100m)', cat: 'Cabos', qtd: 42, min: 80, custo: 184.0 },
  { sku: 'PRD-3381', nome: 'Módulo Controlador X2', cat: 'Eletrônicos', qtd: 76, min: 40, custo: 298.9 },
  { sku: 'PRD-4150', nome: 'Sensor de Presença IR', cat: 'Eletrônicos', qtd: 19, min: 50, custo: 118.5 },
  { sku: 'PRD-5209', nome: 'Fonte Estabilizada 12V', cat: 'Energia', qtd: 203, min: 70, custo: 96.3 },
  { sku: 'PRD-6117', nome: 'Disjuntor Bipolar 40A', cat: 'Proteção', qtd: 88, min: 45, custo: 72.8 },
  { sku: 'PRD-7004', nome: 'Painel LED 36W', cat: 'Iluminação', qtd: 31, min: 35, custo: 145.0 }
]

const LANCAMENTOS = [
  { desc: 'NF 10482 — Construtora Horizonte', venc: '05/11/2026', tipo: 'Receber', valor: 28450.0, status: 'Pendente' },
  { desc: 'Fornecedor Volt Distribuidora', venc: '03/11/2026', tipo: 'Pagar', valor: 18200.0, status: 'Pendente' },
  { desc: 'NF 10480 — Elétrica Ribeiro ME', venc: '30/10/2026', tipo: 'Receber', valor: 15890.0, status: 'Pago' },
  { desc: 'Folha de pagamento — outubro', venc: '05/11/2026', tipo: 'Pagar', valor: 42600.0, status: 'Pendente' },
  { desc: 'NF 10478 — Auto Peças Centro', venc: '29/10/2026', tipo: 'Receber', valor: 7640.0, status: 'Pago' },
  { desc: 'Aluguel do galpão', venc: '10/11/2026', tipo: 'Pagar', valor: 9800.0, status: 'Pendente' }
]

const CLIENTES = [
  { nome: 'Construtora Horizonte', doc: '12.345.678/0001-90', cidade: 'São Paulo/SP', pedidos: 38, total: 412800, desde: '2021' },
  { nome: 'Elétrica Ribeiro ME', doc: '23.456.789/0001-10', cidade: 'Guarulhos/SP', pedidos: 54, total: 286400, desde: '2020' },
  { nome: 'Transportes Aliança', doc: '34.567.890/0001-21', cidade: 'Campinas/SP', pedidos: 21, total: 198300, desde: '2023' },
  { nome: 'Mercado São Jorge', doc: '45.678.901/0001-32', cidade: 'Osasco/SP', pedidos: 67, total: 154900, desde: '2019' },
  { nome: 'Clínica Vida Plena', doc: '56.789.012/0001-43', cidade: 'Santo André/SP', pedidos: 12, total: 68200, desde: '2024' }
]

const CLASSE_STATUS = {
  Pago: 'st-pago',
  Pendente: 'st-pendente',
  'Em produção': 'st-producao',
  Cancelado: 'st-cancelado',
  Entregue: 'st-entregue'
}

/* ---------------- paginas de cada modulo ---------------- */

function Dashboard() {
  const [periodo, setPeriodo] = useState('12m')
  const dados = DADOS[periodo]
  const indicadores = INDICADORES[periodo]
  const maiorReceita = Math.max(...TOP_PRODUTOS.map((p) => p.receita))

  const CORES_KPI = [SERIES.s1, SERIES.s3, SERIES.s2, SERIES.s4]
  const ICONES_KPI = [TrendingUp, ClipboardList, Target, Percent]

  const rotuloPeriodo = PERIODOS.find((p) => p.id === periodo).rotulo

  return (
    <>
      {/* filtros: uma linha so, acima de tudo, e vale para o painel inteiro */}
      <div className="erp-filtros-topo">
        <span className="rot">Período</span>
        <div className="erp-periodo" role="group" aria-label="Período analisado">
          {PERIODOS.map((p) => (
            <button
              key={p.id}
              className={periodo === p.id ? 'on' : ''}
              onClick={() => setPeriodo(p.id)}
              aria-pressed={periodo === p.id}
            >
              {p.rotulo}
            </button>
          ))}
        </div>
        <span className="escopo">Todos os indicadores abaixo seguem este período</span>
      </div>

      <div className="erp-kpis">
        {indicadores.map((k, i) => {
          const Icone = ICONES_KPI[i]
          const valor = k.bruto
            ? String(k.valor)
            : k.pct
              ? `${k.valor.toFixed(1).replace('.', ',')}%`
              : brl(k.valor)

          return (
            <div className="erp-kpi" key={k.chave}>
              <div className="erp-kpi-top">
                <span className="erp-kpi-ico" style={{ background: `${CORES_KPI[i]}1a`, color: CORES_KPI[i] }}>
                  <Icone size={20} strokeWidth={2} />
                </span>
                <span className={`erp-delta ${k.sobe ? 'up' : 'down'}`}>{k.delta}</span>
              </div>
              <small>{k.rotulo}</small>
              <b>{valor}</b>
              <MiniGrafico dados={dados.kpis[k.chave]} cor={CORES_KPI[i]} periodo={periodo} />
            </div>
          )
        })}
      </div>

      <div className="erp-card">
        <div className="erp-card-top">
          <div>
            <h3>Faturamento x meta</h3>
            <small>Últimos {rotuloPeriodo} · passe o mouse para ver cada ponto</small>
          </div>
          <button className="erp-btn erp-btn-sec">
            <Download size={15} /> Exportar
          </button>
        </div>
        <GraficoCombo dados={dados.serie} periodo={periodo} />
      </div>

      <div className="erp-cols">
        <div className="erp-card">
          <div className="erp-card-top">
            <div>
              <h3>Pedidos por dia e horário</h3>
              <small>Onde está a demanda — {rotuloPeriodo}</small>
            </div>
          </div>
          <MapaCalor dados={dados.mapaCalor} periodo={periodo} />
        </div>

        <div className="erp-card">
          <div className="erp-card-top">
            <div>
              <h3>Receita por canal</h3>
              <small>Participação no período</small>
            </div>
          </div>
          <Rosca dados={dados.canais} periodo={periodo} />
        </div>
      </div>

      <div className="erp-cols">
        <div className="erp-card">
          <div className="erp-card-top">
            <div>
              <h3>Funil comercial</h3>
              <small>Do primeiro contato ao pedido fechado</small>
            </div>
          </div>
          <Funil dados={dados.funil} periodo={periodo} />
        </div>

        <div className="erp-card">
          <div className="erp-card-top">
            <div>
              <h3>Produtos mais vendidos</h3>
              <small>Receita no período</small>
            </div>
          </div>
          <div className="erp-rank">
            {TOP_PRODUTOS.map((p) => (
              <div className="erp-rank-item" key={p.nome}>
                <div className="erp-rank-top">
                  <b>{p.nome}</b>
                  <span>{p.vendas} un.</span>
                </div>
                <div className="erp-rank-track">
                  <div
                    className="erp-rank-fill"
                    style={{ width: `${(p.receita / maiorReceita) * 100}%` }}
                  />
                </div>
                <span style={{ fontSize: 12.5, color: '#64748B' }}>{brl(p.receita)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="erp-card">
        <div className="erp-card-top">
          <div>
            <h3>Últimos pedidos</h3>
            <small>Atualizado há poucos minutos</small>
          </div>
          <button className="erp-btn"><Plus size={15} /> Novo pedido</button>
        </div>
        <TabelaPedidos lista={PEDIDOS.slice(0, 5)} />
      </div>
    </>
  )
}

function TabelaPedidos({ lista }) {
  return (
    <div className="erp-rolar">
      <table className="erp-tabela">
        <thead>
          <tr>
            <th>Pedido</th>
            <th>Cliente</th>
            <th>Data</th>
            <th>Itens</th>
            <th>Valor</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {lista.map((p) => (
            <tr key={p.id}>
              <td><b>{p.id}</b></td>
              <td>{p.cliente}</td>
              <td>{p.data}</td>
              <td>{p.itens}</td>
              <td><b>{brl(p.valor)}</b></td>
              <td>
                <span className={`erp-status ${CLASSE_STATUS[p.status]}`}>{p.status}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function Pedidos() {
  const [filtro, setFiltro] = useState('Todos')
  const opcoes = ['Todos', 'Pendente', 'Em produção', 'Pago', 'Entregue', 'Cancelado']
  const lista = filtro === 'Todos' ? PEDIDOS : PEDIDOS.filter((p) => p.status === filtro)
  const total = lista.reduce((s, p) => s + p.valor, 0)

  return (
    <div className="erp-card">
      <div className="erp-card-top">
        <div>
          <h3>Pedidos</h3>
          <small>
            {lista.length} {lista.length === 1 ? 'pedido' : 'pedidos'} — {brl(total)} no total
          </small>
        </div>
        <button className="erp-btn"><Plus size={15} /> Novo pedido</button>
      </div>

      <div className="erp-filtros">
        {opcoes.map((o) => (
          <button
            key={o}
            className={`erp-filtro${filtro === o ? ' on' : ''}`}
            onClick={() => setFiltro(o)}
          >
            {o}
          </button>
        ))}
      </div>

      <TabelaPedidos lista={lista} />
    </div>
  )
}

function Estoque() {
  const [busca, setBusca] = useState('')
  const lista = useMemo(
    () =>
      ESTOQUE.filter(
        (e) =>
          e.nome.toLowerCase().includes(busca.toLowerCase()) ||
          e.sku.toLowerCase().includes(busca.toLowerCase())
      ),
    [busca]
  )

  const abaixoDoMinimo = ESTOQUE.filter((e) => e.qtd < e.min)
  const valorTotal = ESTOQUE.reduce((s, e) => s + e.qtd * e.custo, 0)

  return (
    <>
      {abaixoDoMinimo.length > 0 && (
        <div className="erp-alerta">
          <AlertTriangle size={19} />
          <span>{abaixoDoMinimo.length} {abaixoDoMinimo.length === 1 ? 'item está' : 'itens estão'} abaixo
          do estoque mínimo: {abaixoDoMinimo.map((e) => e.nome).join(', ')}.</span>
        </div>
      )}

      <div className="erp-card">
        <div className="erp-card-top">
          <div>
            <h3>Estoque</h3>
            <small>
              {ESTOQUE.length} SKUs — {brl(valorTotal)} em mercadoria
            </small>
          </div>
          <div style={{ display: 'flex', gap: 9 }}>
            <div className="erp-busca-tabela">
              <Search size={15} />
              <input
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                placeholder="Buscar produto ou SKU..."
              />
            </div>
            <button className="erp-btn"><Plus size={15} /> Entrada</button>
          </div>
        </div>

        <div className="erp-rolar">
          <table className="erp-tabela">
            <thead>
              <tr>
                <th>SKU</th>
                <th>Produto</th>
                <th>Categoria</th>
                <th>Nível</th>
                <th>Qtd. / Mín.</th>
                <th>Custo unit.</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {lista.map((e) => {
                const proporcao = Math.min(e.qtd / (e.min * 2), 1)
                const cor = e.qtd < e.min ? '#DC2626' : e.qtd < e.min * 1.4 ? '#D97706' : '#16A34A'
                return (
                  <tr key={e.sku}>
                    <td><b>{e.sku}</b></td>
                    <td>{e.nome}</td>
                    <td>{e.cat}</td>
                    <td>
                      <div className="erp-nivel">
                        <div className="erp-nivel-track">
                          <div
                            className="erp-nivel-fill"
                            style={{ width: `${proporcao * 100}%`, background: cor }}
                          />
                        </div>
                      </div>
                    </td>
                    <td style={{ color: cor, fontWeight: 700 }}>
                      {e.qtd} / {e.min}
                    </td>
                    <td>{brl(e.custo)}</td>
                    <td><b>{brl(e.qtd * e.custo)}</b></td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

function Financeiro() {
  const receber = LANCAMENTOS.filter((l) => l.tipo === 'Receber' && l.status === 'Pendente')
    .reduce((s, l) => s + l.valor, 0)
  const pagar = LANCAMENTOS.filter((l) => l.tipo === 'Pagar' && l.status === 'Pendente')
    .reduce((s, l) => s + l.valor, 0)

  return (
    <>
      <div className="erp-fin">
        <div className="erp-fin-card" style={{ borderLeft: '4px solid #16A34A' }}>
          <small>A receber (em aberto)</small>
          <b style={{ color: '#16A34A' }}>{brl(receber)}</b>
        </div>
        <div className="erp-fin-card" style={{ borderLeft: '4px solid #DC2626' }}>
          <small>A pagar (em aberto)</small>
          <b style={{ color: '#DC2626' }}>{brl(pagar)}</b>
        </div>
        <div className="erp-fin-card" style={{ borderLeft: '4px solid #4F46E5' }}>
          <small>Saldo projetado</small>
          <b style={{ color: receber - pagar >= 0 ? '#4F46E5' : '#DC2626' }}>{brl(receber - pagar)}</b>
        </div>
      </div>

      <div className="erp-card">
        <div className="erp-card-top">
          <div>
            <h3>Contas a pagar e a receber</h3>
            <small>Próximos vencimentos</small>
          </div>
          <button className="erp-btn"><Plus size={15} /> Lançamento</button>
        </div>

        <div className="erp-rolar">
          <table className="erp-tabela">
            <thead>
              <tr>
                <th>Descrição</th>
                <th>Tipo</th>
                <th>Vencimento</th>
                <th>Valor</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {LANCAMENTOS.map((l) => (
                <tr key={l.desc}>
                  <td><b>{l.desc}</b></td>
                  <td style={{ color: l.tipo === 'Receber' ? '#16A34A' : '#DC2626', fontWeight: 700 }}>
                    {l.tipo}
                  </td>
                  <td>{l.venc}</td>
                  <td><b>{brl(l.valor)}</b></td>
                  <td>
                    <span className={`erp-status ${CLASSE_STATUS[l.status]}`}>{l.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

function Clientes() {
  return (
    <div className="erp-card">
      <div className="erp-card-top">
        <div>
          <h3>Clientes</h3>
          <small>{CLIENTES.length} cadastros ativos</small>
        </div>
        <button className="erp-btn"><Plus size={15} /> Novo cliente</button>
      </div>

      <div className="erp-rolar">
        <table className="erp-tabela">
          <thead>
            <tr>
              <th>Cliente</th>
              <th>CNPJ</th>
              <th>Cidade</th>
              <th>Pedidos</th>
              <th>Total comprado</th>
              <th>Cliente desde</th>
            </tr>
          </thead>
          <tbody>
            {CLIENTES.map((c) => (
              <tr key={c.doc}>
                <td><b>{c.nome}</b></td>
                <td>{c.doc}</td>
                <td>{c.cidade}</td>
                <td>{c.pedidos}</td>
                <td><b>{brl(c.total)}</b></td>
                <td>{c.desde}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

/* ---------------- shell do sistema ---------------- */

const TITULOS = {
  dashboard: ['Visão geral', 'Resumo da operação em tempo real'],
  pedidos: ['Pedidos', 'Acompanhe e filtre os pedidos por status'],
  estoque: ['Estoque', 'Controle de produtos, níveis e custo'],
  financeiro: ['Financeiro', 'Contas a pagar, a receber e saldo projetado'],
  clientes: ['Clientes', 'Base de clientes e histórico de compras']
}

export default function ErpDemo() {
  const [modulo, setModulo] = useState('dashboard')
  const [menuAberto, setMenuAberto] = useState(false)

  useEffect(() => {
    document.title = 'Modelo — Sistema ERP de Gestão | Next Codexa'
  }, [])

  const [titulo, subtitulo] = TITULOS[modulo]

  const conteudo = {
    dashboard: <Dashboard />,
    pedidos: <Pedidos />,
    estoque: <Estoque />,
    financeiro: <Financeiro />,
    clientes: <Clientes />
  }[modulo]

  return (
    <div className="erp">
      <BarraModelo tipo="Sistema ERP de gestão" />

      <div className="erp-app">
        <aside className={`erp-side${menuAberto ? ' aberta' : ''}`}>
          <div className="erp-brand">
            <i>NC</i>
            <div>
              <b>Codexa ERP</b>
              <small>Gestão empresarial</small>
            </div>
          </div>

          <nav className="erp-nav">
            {MODULOS.map((m) => (
              <button
                key={m.id}
                className={modulo === m.id ? 'on' : ''}
                onClick={() => {
                  setModulo(m.id)
                  setMenuAberto(false)
                }}
              >
                <m.Icone size={18} strokeWidth={1.9} /> {m.nome}
              </button>
            ))}
          </nav>

          <div className="erp-user">
            <img src="/img/pessoas/leonardo.jpg" alt="" />
            <div>
              <b>Leonardo O.</b>
              <small>Administrador</small>
            </div>
          </div>
        </aside>

        {menuAberto && <div className="erp-back" onClick={() => setMenuAberto(false)} />}

        <div className="erp-main">
          <header className="erp-top">
            <button
              className="erp-menu-mob"
              onClick={() => setMenuAberto(true)}
              aria-label="Abrir menu"
            >
              <Menu size={18} />
            </button>
            <div>
              <h1>{titulo}</h1>
              <div className="erp-top-sub">{subtitulo}</div>
            </div>

            <div className="erp-top-acoes">
              <div className="erp-busca">
                <Search size={15} />
                <input placeholder="Buscar no sistema..." />
              </div>
              <button className="erp-btn erp-btn-sec erp-btn-ico" aria-label="Notificações"><Bell size={16} /></button>
            </div>
          </header>

          <div className="erp-body">{conteudo}</div>

          <div className="erp-foot">
            Modelo demonstrativo desenvolvido pela <strong>Next Codexa</strong> — empresa, números e
            cadastros são fictícios.
          </div>
        </div>
      </div>
    </div>
  )
}
