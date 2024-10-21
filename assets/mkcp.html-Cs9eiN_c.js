import{_ as i,r as n,o as r,c as s,a as e,b as t,d as a,e as h}from"./app-C01R1QYn.js";const o={},p=t("h1",{id:"протокол-mkcp",tabindex:"-1"},[t("a",{class:"header-anchor",href:"#протокол-mkcp"},[t("span",null,"Протокол mKCP")])],-1),c={href:"https://github.com/skywind3000/kcp",target:"_blank",rel:"noopener noreferrer"},b=h('<h2 id="версия" tabindex="-1"><a class="header-anchor" href="#версия"><span>Версия</span></a></h2><p>Протокол mKCP не имеет номера версии, совместимость между версиями не гарантируется.</p><h2 id="зависимости" tabindex="-1"><a class="header-anchor" href="#зависимости"><span>Зависимости</span></a></h2><h3 id="базовыи-протокол" tabindex="-1"><a class="header-anchor" href="#базовыи-протокол"><span>Базовый протокол</span></a></h3><p>mKCP - это протокол, основанный на UDP, все коммуникации осуществляются по UDP.</p><h3 id="функции" tabindex="-1"><a class="header-anchor" href="#функции"><span>Функции</span></a></h3>',6),_={href:"https://en.wikipedia.org/wiki/Fowler%E2%80%93Noll%E2%80%93Vo_hash_function",target:"_blank",rel:"noopener noreferrer"},m=t("ul",null,[t("li",null,"Входные данные: строка произвольной длины;"),t("li",null,"Выходные данные: 32-битное беззнаковое целое число;")],-1),u=h('<h2 id="процесс-коммуникации" tabindex="-1"><a class="header-anchor" href="#процесс-коммуникации"><span>Процесс коммуникации</span></a></h2><ol><li>mKCP разбивает поток данных на несколько пакетов для отправки. Каждый поток данных имеет уникальный идентификатор, который используется для различения разных потоков данных. Каждый пакет данных в потоке данных несет один и тот же идентификатор.</li><li>У mKCP нет процесса рукопожатия. При получении пакета данных определяется, является ли это новым вызовом или текущим вызовом, на основе идентификатора потока данных, который он несет.</li><li>Каждый пакет данных содержит несколько сегментов (Segment), которые делятся на три типа: данные (Data), подтверждение (ACK) и пульс (Ping). Каждый сегмент обрабатывается отдельно.</li></ol><h2 id="формат-данных" tabindex="-1"><a class="header-anchor" href="#формат-данных"><span>Формат данных</span></a></h2><h3 id="пакет-данных" tabindex="-1"><a class="header-anchor" href="#пакет-данных"><span>Пакет данных</span></a></h3><table><thead><tr><th>4 байта</th><th>2 байта</th><th>L байт</th></tr></thead><tbody><tr><td>Информация для аутентификации A</td><td>Длина данных L</td><td>Сегментная часть</td></tr></tbody></table><p>Где:</p><ul><li>Информация для аутентификации A = fnv(сегментная часть), big endian;</li><li>Сегментная часть может содержать несколько сегментов;</li></ul><h3 id="сегмент-данных" tabindex="-1"><a class="header-anchor" href="#сегмент-данных"><span>Сегмент данных</span></a></h3><table><thead><tr><th>2 байта</th><th>1 байт</th><th>1 байт</th><th>4 байта</th><th>4 байта</th><th>4 байта</th><th>2 байта</th><th>Len байт</th></tr></thead><tbody><tr><td>Идентификатор Conv</td><td>Команда Cmd</td><td>Опция Opt</td><td>Временная метка Ts</td><td>Порядковый номер Sn</td><td>Неподтвержденный порядковый номер Una</td><td>Длина Len</td><td>Данные</td></tr></tbody></table><p>Где:</p><ul><li>Идентификатор Conv: идентификатор потока данных mKCP</li><li>Команда Cmd: константа 0x01</li><li>Опция Opt: возможные значения: <ul><li>0x00: пустая опция</li><li>0x01: другая сторона отправила все данные</li></ul></li><li>Временная метка Ts: время отправки текущего сегмента с удаленной стороны, big endian</li><li>Порядковый номер Sn: позиция сегмента данных в потоке данных, порядковый номер начального сегмента равен 0, каждый последующий сегмент увеличивается на 1</li><li>Неподтвержденный порядковый номер Una: минимальный Sn, который отправляется удаленным хостом и еще не получил подтверждение</li></ul><h3 id="сегмент-подтверждения" tabindex="-1"><a class="header-anchor" href="#сегмент-подтверждения"><span>Сегмент подтверждения</span></a></h3><table><thead><tr><th>2 байта</th><th>1 байт</th><th>1 байт</th><th>4 байта</th><th>4 байта</th><th>4 байта</th><th>2 байта</th><th>Len * 4 байта</th></tr></thead><tbody><tr><td>Идентификатор Conv</td><td>Команда Cmd</td><td>Опция Opt</td><td>Окно Wnd</td><td>Следующий порядковый номер для приема Sn</td><td>Временная метка Ts</td><td>Длина Len</td><td>Подтвержденные порядковые номера</td></tr></tbody></table><p>Где:</p><ul><li>Идентификатор Conv: идентификатор потока данных mKCP</li><li>Команда Cmd: константа 0x00</li><li>Опция Opt: как указано выше</li><li>Окно Wnd: максимальный порядковый номер, который может принять удаленный хост</li><li>Следующий порядковый номер для приема Sn: минимальный порядковый номер сегмента данных, который не получил удаленный хост</li><li>Временная метка Ts: временная метка последнего полученного сегмента данных удаленным хостом, может использоваться для расчета задержки</li><li>Подтвержденные порядковые номера: каждые 4 байта указывают, что данные с этим порядковым номером получены и подтверждены</li></ul><p>Комментарий:</p><ul><li>Удаленный хост ожидает получения данных с порядковыми номерами в диапазоне [Sn, Wnd)</li></ul><h3 id="сегмент-пульса" tabindex="-1"><a class="header-anchor" href="#сегмент-пульса"><span>Сегмент пульса</span></a></h3><table><thead><tr><th>2 байта</th><th>1 байт</th><th>1 байт</th><th>4 байта</th><th>4 байта</th><th>4 байта</th></tr></thead><tbody><tr><td>Идентификатор Conv</td><td>Команда Cmd</td><td>Опция Opt</td><td>Неподтвержденный порядковый номер Una</td><td>Следующий порядковый номер для приема Sn</td><td>Задержка Rto</td></tr></tbody></table><p>Где:</p><ul><li>Идентификатор Conv: идентификатор потока данных mKCP</li><li>Команда Cmd: возможные значения: <ul><li>0x02: удаленный хост принудительно завершает сеанс</li><li>0x03: обычный пульс</li></ul></li><li>Опция Opt: как указано выше</li><li>Неподтвержденный порядковый номер Una: тот же, что и Una в сегменте данных</li><li>Следующий порядковый номер для приема Sn: тот же, что и Sn в сегменте подтверждения</li><li>Задержка Rto: задержка, рассчитанная самим удаленным хостом</li></ul>',21);function f(C,x){const d=n("I18nTip"),l=n("ExternalLinkIcon");return r(),s("div",null,[e(d),p,t("p",null,[a("mKCP - это потоковый транспортный протокол, основанный на "),t("a",c,[a("протоколе KCP"),e(l)]),a(", который может передавать любые потоки данных по порядку.")]),b,t("ul",null,[t("li",null,[a("fnv: хэш-функция "),t("a",_,[a("FNV-1a"),e(l)]),m])]),u])}const P=i(o,[["render",f],["__file","mkcp.html.vue"]]);export{P as default};