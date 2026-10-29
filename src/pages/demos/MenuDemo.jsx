import { useState, useMemo, useEffect } from 'react'
import {
  Search, Plus, Minus, X, ShoppingBag, MapPin, Clock, Star, Flame,
  UtensilsCrossed, Salad, Pizza, CupSoda, IceCream2,
  Store, Bike, PackageCheck, SearchX, MessageCircle
} from 'lucide-react'
import BarraModelo from '../../components/BarraModelo.jsx'
import LogoSaborArte from './menu/LogoSaborArte.jsx'
import { linkWhats, brl, mascaraTelefone } from '../../config.js'
import '../../styles/demo-menu.css'

/* Numero fictício usado apenas na demonstração */
const WPP_DEMO = '5511999999999'

const CATEGORIAS = [
  { id: 'entradas', nome: 'Entradas', Icone: Salad },
  { id: 'principais', nome: 'Pratos principais', Icone: UtensilsCrossed },
  { id: 'pizzas', nome: 'Pizzas', Icone: Pizza },
  { id: 'bebidas', nome: 'Bebidas', Icone: CupSoda },
  { id: 'sobremesas', nome: 'Sobremesas', Icone: IceCream2 }
]

const CARDAPIO = [
  { id: 1, cat: 'entradas', nome: 'Bruschetta da casa', desc: 'Pão italiano tostado, tomate confit, manjericão fresco e azeite extravirgem (4 unidades).', preco: 28.9, img: '/img/menu/bruschetta.jpg' },
  { id: 2, cat: 'entradas', nome: 'Bolinho de bacalhau', desc: 'Oito unidades crocantes, servidas com aioli de limão siciliano.', preco: 42.0, img: '/img/menu/bolinho.jpg', tag: 'Mais pedido' },
  { id: 3, cat: 'entradas', nome: 'Salada Caprese', desc: 'Tomate italiano, muçarela de búfala, pesto e redução de balsâmico.', preco: 36.5, img: '/img/menu/caprese.jpg' },

  { id: 4, cat: 'principais', nome: 'Filé ao molho madeira', desc: 'Filé mignon grelhado no ponto, molho madeira e batata rústica crocante.', preco: 89.9, img: '/img/menu/file.jpg', tag: 'Sugestão do chef' },
  { id: 5, cat: 'principais', nome: 'Risoto de funghi', desc: 'Arroz arbóreo cremoso, mix de cogumelos, parmesão e toque de trufa.', preco: 72.0, img: '/img/menu/risoto.jpg' },
  { id: 6, cat: 'principais', nome: 'Salmão grelhado', desc: 'Salmão com crosta de ervas, legumes salteados e molho cítrico.', preco: 94.5, img: '/img/menu/salmao.jpg' },
  { id: 7, cat: 'principais', nome: 'Penne ao pomodoro', desc: 'Massa artesanal, molho de tomate san marzano e manjericão fresco.', preco: 54.0, img: '/img/menu/massa.jpg' },

  { id: 8, cat: 'pizzas', nome: 'Pizza Margherita', desc: 'Muçarela de búfala, tomate, manjericão e azeite. Massa de fermentação natural.', preco: 62.0, img: '/img/menu/pizza-margherita.jpg' },
  { id: 9, cat: 'pizzas', nome: 'Pizza Calabresa artesanal', desc: 'Calabresa defumada da casa, cebola roxa e orégano fresco.', preco: 66.0, img: '/img/menu/pizza-calabresa.jpg', tag: 'Mais pedido' },
  { id: 10, cat: 'pizzas', nome: 'Pizza Quatro queijos', desc: 'Muçarela, gorgonzola, parmesão e catupiry original.', preco: 69.0, img: '/img/menu/pizza-queijos.jpg' },

  { id: 11, cat: 'bebidas', nome: 'Suco natural 500ml', desc: 'Laranja, abacaxi com hortelã, maracujá ou limonada suíça.', preco: 14.9, img: '/img/menu/suco.jpg' },
  { id: 12, cat: 'bebidas', nome: 'Refrigerante 350ml', desc: 'Cola, guaraná, laranja ou limão — versões tradicional e zero.', preco: 8.5, img: '/img/menu/refrigerante.jpg' },
  { id: 13, cat: 'bebidas', nome: 'Taça de vinho tinto', desc: 'Seleção da casa — Malbec argentino safra 2021.', preco: 32.0, img: '/img/menu/vinho.jpg' },
  { id: 14, cat: 'bebidas', nome: 'Água mineral 500ml', desc: 'Com ou sem gás, servida bem gelada.', preco: 6.0, img: '/img/menu/agua.jpg' },

  { id: 15, cat: 'sobremesas', nome: 'Petit gâteau', desc: 'Bolo quente de chocolate belga com recheio cremoso e sorvete de creme.', preco: 32.0, img: '/img/menu/petit-gateau.jpg', tag: 'Mais pedido' },
  { id: 16, cat: 'sobremesas', nome: 'Cheesecake de frutas vermelhas', desc: 'Base crocante, creme suave e calda artesanal de frutas vermelhas.', preco: 29.5, img: '/img/menu/cheesecake.jpg' },
  { id: 17, cat: 'sobremesas', nome: 'Pudim de leite', desc: 'Receita da casa, calda de caramelo queimado na hora.', preco: 22.0, img: '/img/menu/pudim.jpg' }
]

const TIPOS = [
  { nome: 'Mesa', Icone: Store },
  { nome: 'Retirada', Icone: PackageCheck },
  { nome: 'Delivery', Icone: Bike }
]

export default function MenuDemo() {
  const [busca, setBusca] = useState('')
  const [categoria, setCategoria] = useState('todas')
  const [carrinho, setCarrinho] = useState({})
  const [aberto, setAberto] = useState(false)
  const [tipo, setTipo] = useState('Mesa')
  const [cliente, setCliente] = useState({ nome: '', tel: '', mesa: '', endereco: '', obs: '' })
  const [erros, setErros] = useState({})

  useEffect(() => {
    document.title = 'Modelo — Cardápio Digital | Next Codexa'
  }, [])

  useEffect(() => {
    document.body.style.overflow = aberto ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [aberto])

  const itensFiltrados = useMemo(() => {
    const termo = busca.trim().toLowerCase()
    return CARDAPIO.filter((i) => {
      const casaCategoria = categoria === 'todas' || i.cat === categoria
      const casaBusca = !termo || i.nome.toLowerCase().includes(termo) || i.desc.toLowerCase().includes(termo)
      return casaCategoria && casaBusca
    })
  }, [busca, categoria])

  const grupos = useMemo(
    () =>
      CATEGORIAS.map((c) => ({
        ...c,
        itens: itensFiltrados.filter((i) => i.cat === c.id)
      })).filter((g) => g.itens.length > 0),
    [itensFiltrados]
  )

  const linhas = useMemo(
    () =>
      Object.entries(carrinho)
        .map(([id, qtd]) => ({ item: CARDAPIO.find((i) => i.id === Number(id)), qtd }))
        .filter((l) => l.item && l.qtd > 0),
    [carrinho]
  )

  const totalItens = linhas.reduce((s, l) => s + l.qtd, 0)
  const totalValor = linhas.reduce((s, l) => s + l.item.preco * l.qtd, 0)

  const mudarQtd = (id, delta) =>
    setCarrinho((c) => {
      const nova = (c[id] || 0) + delta
      const copia = { ...c }
      if (nova <= 0) delete copia[id]
      else copia[id] = nova
      return copia
    })

  const alterarCliente = (campo) => (e) => {
    const valor = campo === 'tel' ? mascaraTelefone(e.target.value) : e.target.value
    setCliente((c) => ({ ...c, [campo]: valor }))
    setErros((x) => ({ ...x, [campo]: false }))
  }

  const enviarPedido = () => {
    const faltando = {
      nome: !cliente.nome.trim(),
      tel: tipo !== 'Mesa' && cliente.tel.replace(/\D/g, '').length < 10,
      mesa: tipo === 'Mesa' && !cliente.mesa.trim(),
      endereco: tipo === 'Delivery' && !cliente.endereco.trim()
    }
    if (Object.values(faltando).some(Boolean)) {
      setErros(faltando)
      return
    }

    const itens = linhas
      .map((l) => `• ${l.qtd}x ${l.item.nome} — ${brl(l.item.preco * l.qtd)}`)
      .join('\n')

    const texto =
      `*NOVO PEDIDO — Sabor & Arte*\n\n` +
      `*Cliente:* ${cliente.nome}\n` +
      `*Tipo:* ${tipo}\n` +
      (tipo === 'Mesa' ? `*Mesa:* ${cliente.mesa}\n` : '') +
      (tipo !== 'Mesa' ? `*WhatsApp:* ${cliente.tel}\n` : '') +
      (tipo === 'Delivery' ? `*Endereço:* ${cliente.endereco}\n` : '') +
      `\n*Itens:*\n${itens}\n\n` +
      `*Total: ${brl(totalValor)}*` +
      (cliente.obs ? `\n\n*Observações:* ${cliente.obs}` : '')

    window.open(linkWhats(texto, WPP_DEMO), '_blank', 'noopener')
  }

  return (
    <div className="mn">
      <BarraModelo tipo="Cardápio / Menu Digital" />

      <div className="mn-capa">
        <img src="/img/menu/capa.jpg" alt="Salão do restaurante Sabor & Arte" />
      </div>

      <div className="mn-wrap mn-head">
        <div className="mn-head-card">
          <LogoSaborArte tamanho={74} className="mn-logo" />
          <div>
            <h1>Restaurante Sabor &amp; Arte</h1>
            <div className="mn-meta">
              <span className="mn-aberto">● Aberto agora</span>
              <span><Star size={14} fill="currentColor" /> 4,8 (612 avaliações)</span>
              <span><Clock size={14} /> Entrega 35–50 min</span>
              <span><MapPin size={14} /> Rua das Palmeiras, 340</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mn-wrap">
        <div className="mn-tools">
          <div className="mn-busca">
            <Search size={18} />
            <input
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              placeholder="Buscar no cardápio..."
            />
          </div>

          <div className="mn-cats">
            <button
              className={`mn-cat${categoria === 'todas' ? ' on' : ''}`}
              onClick={() => setCategoria('todas')}
            >
              Todos
            </button>
            {CATEGORIAS.map(({ id, nome, Icone }) => (
              <button
                key={id}
                className={`mn-cat${categoria === id ? ' on' : ''}`}
                onClick={() => setCategoria(id)}
              >
                <Icone size={15} /> {nome}
              </button>
            ))}
          </div>
        </div>

        {grupos.length === 0 && (
          <div className="mn-vazio">
            <SearchX size={44} />
            <div>Nenhum item encontrado para “{busca}”.</div>
          </div>
        )}

        {grupos.map(({ id, nome, Icone, itens }) => (
          <section className="mn-grupo" key={id}>
            <h2>
              <Icone size={20} /> {nome}
            </h2>
            <div className="mn-itens">
              {itens.map((item) => {
                const qtd = carrinho[item.id] || 0
                return (
                  <article className="mn-item" key={item.id}>
                    <div className="mn-foto">
                      <img src={item.img} alt={item.nome} loading="lazy" />
                    </div>
                    <div className="mn-info">
                      {item.tag && (
                        <span className="mn-tagd">
                          <Flame size={11} /> {item.tag}
                        </span>
                      )}
                      <h3>{item.nome}</h3>
                      <p className="mn-desc">{item.desc}</p>
                      <div className="mn-rodape">
                        <span className="mn-preco">{brl(item.preco)}</span>
                        {qtd === 0 ? (
                          <button
                            className="mn-add"
                            onClick={() => mudarQtd(item.id, 1)}
                            aria-label={`Adicionar ${item.nome}`}
                          >
                            <Plus size={19} />
                          </button>
                        ) : (
                          <div className="mn-qtd">
                            <button onClick={() => mudarQtd(item.id, -1)} aria-label="Remover um">
                              <Minus size={16} />
                            </button>
                            <b>{qtd}</b>
                            <button onClick={() => mudarQtd(item.id, 1)} aria-label="Adicionar um">
                              <Plus size={16} />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          </section>
        ))}

        <div className="mn-foot">
          <LogoSaborArte tamanho={46} className="mn-foot-logo" />
          <strong className="mn-foot-nome">Sabor &amp; Arte</strong>
          <span>Rua das Palmeiras, 340 · (11) 4002-8922 · todos os dias, 11h às 23h</span>
          <small>
            Modelo demonstrativo desenvolvido pela <strong>Next Codexa</strong> — restaurante,
            itens e preços são fictícios.
          </small>
        </div>
      </div>

      {totalItens > 0 && !aberto && (
        <div className="mn-bar">
          <button className="mn-bar-in" onClick={() => setAberto(true)}>
            <span className="mn-bar-esq">
              <ShoppingBag size={22} />
              <span>
                <b>Ver meu pedido</b>
                <small>
                  {totalItens} {totalItens === 1 ? 'item' : 'itens'}
                </small>
              </span>
            </span>
            <b>{brl(totalValor)}</b>
          </button>
        </div>
      )}

      {aberto && (
        <>
          <div className="mn-overlay" onClick={() => setAberto(false)} />
          <aside className="mn-drawer">
            <div className="mn-drawer-top">
              <h2>
                <ShoppingBag size={20} /> Seu pedido
              </h2>
              <button className="mn-fechar" onClick={() => setAberto(false)} aria-label="Fechar">
                <X size={19} />
              </button>
            </div>

            <div className="mn-drawer-body">
              {linhas.length === 0 ? (
                <div className="mn-carrinho-vazio">
                  <ShoppingBag size={46} />
                  <div>Seu carrinho está vazio.</div>
                </div>
              ) : (
                linhas.map((l) => (
                  <div className="mn-linha" key={l.item.id}>
                    <div className="mn-linha-foto">
                      <img src={l.item.img} alt="" />
                    </div>
                    <div className="mn-linha-info">
                      <b>{l.item.nome}</b>
                      <small>{brl(l.item.preco)} cada</small>
                    </div>
                    <div className="mn-qtd">
                      <button onClick={() => mudarQtd(l.item.id, -1)} aria-label="Remover um">
                        <Minus size={16} />
                      </button>
                      <b>{l.qtd}</b>
                      <button onClick={() => mudarQtd(l.item.id, 1)} aria-label="Adicionar um">
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {linhas.length > 0 && (
              <div className="mn-form">
                <div className="mn-tipos">
                  {TIPOS.map(({ nome, Icone }) => (
                    <button
                      key={nome}
                      className={`mn-tipo${tipo === nome ? ' on' : ''}`}
                      onClick={() => setTipo(nome)}
                    >
                      <Icone size={17} />
                      {nome}
                    </button>
                  ))}
                </div>

                <div className={`mn-fi${erros.nome ? ' erro' : ''}`}>
                  <label htmlFor="mn-nome">Seu nome *</label>
                  <input id="mn-nome" value={cliente.nome} onChange={alterarCliente('nome')} placeholder="Nome" />
                </div>

                {tipo === 'Mesa' ? (
                  <div className={`mn-fi${erros.mesa ? ' erro' : ''}`}>
                    <label htmlFor="mn-mesa">Número da mesa *</label>
                    <input id="mn-mesa" value={cliente.mesa} onChange={alterarCliente('mesa')} placeholder="Ex.: 12" />
                  </div>
                ) : (
                  <div className={`mn-fi${erros.tel ? ' erro' : ''}`}>
                    <label htmlFor="mn-tel">WhatsApp *</label>
                    <input
                      id="mn-tel"
                      type="tel"
                      value={cliente.tel}
                      onChange={alterarCliente('tel')}
                      placeholder="(11) 90000-0000"
                    />
                  </div>
                )}

                {tipo === 'Delivery' && (
                  <div className={`mn-fi${erros.endereco ? ' erro' : ''}`}>
                    <label htmlFor="mn-end">Endereço de entrega *</label>
                    <input
                      id="mn-end"
                      value={cliente.endereco}
                      onChange={alterarCliente('endereco')}
                      placeholder="Rua, número, complemento e bairro"
                    />
                  </div>
                )}

                <div className="mn-fi">
                  <label htmlFor="mn-obs">Observações</label>
                  <textarea
                    id="mn-obs"
                    value={cliente.obs}
                    onChange={alterarCliente('obs')}
                    placeholder="Ex.: sem cebola, ponto da carne, troco para R$ 100..."
                  />
                </div>

                <div className="mn-total">
                  <span>
                    Total ({totalItens} {totalItens === 1 ? 'item' : 'itens'})
                  </span>
                  <b>{brl(totalValor)}</b>
                </div>

                <button className="mn-enviar" onClick={enviarPedido}>
                  <MessageCircle size={20} /> Enviar pedido pelo WhatsApp
                </button>
              </div>
            )}
          </aside>
        </>
      )}
    </div>
  )
}
