import{_ as n,r as a,o as s,c as r,a as e,b as t,d as l,e as h}from"./app-DCGcwvA5.js";const o={},p=h('<h1 id="протокол-vmess" tabindex="-1"><a class="header-anchor" href="#протокол-vmess"><span>Протокол VMess</span></a></h1><p>VMess - это зашифрованный транспортный протокол, который может служить мостом между клиентом и сервером Xray.</p><h2 id="версия" tabindex="-1"><a class="header-anchor" href="#версия"><span>Версия</span></a></h2><p>Текущая версия протокола - 1.</p><h2 id="зависимости" tabindex="-1"><a class="header-anchor" href="#зависимости"><span>Зависимости</span></a></h2><h3 id="базовыи-протокол" tabindex="-1"><a class="header-anchor" href="#базовыи-протокол"><span>Базовый протокол</span></a></h3><p>VMess - это протокол, основанный на TCP, все данные передаются по TCP.</p><h3 id="идентификатор-пользователя" tabindex="-1"><a class="header-anchor" href="#идентификатор-пользователя"><span>Идентификатор пользователя</span></a></h3>',8),u={href:"https://en.wikipedia.org/wiki/Universally_unique_identifier",target:"_blank",rel:"noopener noreferrer"},c={href:"https://www.uuidgenerator.net/",target:"_blank",rel:"noopener noreferrer"},b=t("p",null,[l("Идентификатор пользователя можно указать в "),t("a",{href:"../../config"},"файле конфигурации"),l(".")],-1),_=t("h3",{id:"функции",tabindex:"-1"},[t("a",{class:"header-anchor",href:"#функции"},[t("span",null,"Функции")])],-1),x={href:"https://en.wikipedia.org/wiki/MD5",target:"_blank",rel:"noopener noreferrer"},M=t("ul",null,[t("li",null,"Входные данные: массив байтов произвольной длины"),t("li",null,"Выходные данные: массив из 16 байтов")],-1),f={href:"https://en.wikipedia.org/wiki/Hash-based_message_authentication_code",target:"_blank",rel:"noopener noreferrer"},k=t("ul",null,[t("li",null,[l("Входные данные: "),t("ul",null,[t("li",null,"H: хэш-функция"),t("li",null,"K: ключ, массив байтов произвольной длины"),t("li",null,"M: сообщение, массив байтов произвольной длины")])])],-1),C={href:"https://en.wikipedia.org/wiki/SHA-3",target:"_blank",rel:"noopener noreferrer"},y=t("ul",null,[t("li",null,"Входные данные: строка произвольной длины"),t("li",null,"Выходные данные: строка произвольной длины")],-1),V=h('<h2 id="процесс-коммуникации" tabindex="-1"><a class="header-anchor" href="#процесс-коммуникации"><span>Процесс коммуникации</span></a></h2><p>VMess - это протокол без сохранения состояния, то есть клиент и сервер могут передавать данные напрямую без рукопожатия, и каждая передача данных не влияет на предыдущие или последующие передачи.</p><p>Клиент VMess отправляет запрос, а сервер проверяет, исходит ли этот запрос от легитимного клиента. Если проверка пройдена, сервер пересылает запрос и отправляет полученный ответ клиенту.</p><p>VMess использует асимметричный формат, то есть запрос, отправляемый клиентом, и ответ сервера имеют разные форматы.</p><h2 id="запрос-клиента" tabindex="-1"><a class="header-anchor" href="#запрос-клиента"><span>Запрос клиента</span></a></h2><table><thead><tr><th>16 байт</th><th>X байт</th><th>Оставшаяся часть</th></tr></thead><tbody><tr><td>Информация для аутентификации</td><td>Часть с командой</td><td>Часть с данными</td></tr></tbody></table><h3 id="информация-для-аутентификации" tabindex="-1"><a class="header-anchor" href="#информация-для-аутентификации"><span>Информация для аутентификации</span></a></h3><p>Информация для аутентификации - это 16-байтовое хэш-значение, которое вычисляется следующим образом:</p><ul><li>H = MD5</li><li>K = идентификатор пользователя (16 байт)</li><li>M = время UTC с точностью до секунды, случайное значение в диапазоне ±30 секунд от текущего времени (8 байт, Big Endian)</li><li>Hash = HMAC(H, K, M)</li></ul><h3 id="часть-с-командои" tabindex="-1"><a class="header-anchor" href="#часть-с-командои"><span>Часть с командой</span></a></h3><p>Часть с командой шифруется с помощью AES-128-CFB:</p><ul><li>Ключ: MD5(идентификатор пользователя + []byte(&#39;c48619fe-8f02-49e0-b9e9-edf763e17e21&#39;))</li><li>Вектор инициализации: MD5(X + X + X + X), X = []byte(время генерации информации для аутентификации) (8 байт, Big Endian)</li></ul><table><thead><tr><th>1 байт</th><th>16 байт</th><th>16 байт</th><th>1 байт</th><th>1 байт</th><th>4 бита</th><th>4 бита</th><th>1 байт</th><th>1 байт</th><th>2 байта</th><th>1 байт</th><th>N байт</th><th>P байт</th><th>4 байта</th></tr></thead><tbody><tr><td>Номер версии Ver</td><td>Вектор инициализации для шифрования данных</td><td>Ключ для шифрования данных</td><td>Аутентификация ответа V</td><td>Опция Opt</td><td>Остаток P</td><td>Метод шифрования Sec</td><td>Зарезервировано</td><td>Команда Cmd</td><td>Порт Port</td><td>Тип адреса T</td><td>Адрес A</td><td>Случайные данные</td><td>Контрольная сумма F</td></tr></tbody></table><p>Подробности опции Opt: (если бит равен 1, опция включена)</p><table><thead><tr><th>0</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th><th>7</th></tr></thead><tbody><tr><td>X</td><td>X</td><td>X</td><td>X</td><td>X</td><td>M</td><td>R</td><td>S</td></tr></tbody></table><p>Где:</p><ul><li>Номер версии Ver: всегда равен 1;</li><li>Вектор инициализации для шифрования данных: случайное значение;</li><li>Ключ для шифрования данных: случайное значение;</li><li>Аутентификация ответа V: случайное значение;</li><li>Опция Opt: <ul><li>S (0x01): стандартный формат потока данных (рекомендуется включать);</li><li>R (0x02): клиент ожидает повторного использования TCP-соединения (устарело в Xray 2.23+); <ul><li>Действительна только при включенной опции S;</li></ul></li><li>M (0x04): включить обфускацию метаданных (рекомендуется включать); <ul><li>Действительна только при включенной опции S;</li><li>Если эта опция включена, клиент и сервер должны создать два экземпляра Shake: RequestMask = Shake(вектор инициализации для шифрования данных запроса), ResponseMask = Shake(вектор инициализации для шифрования данных ответа).</li></ul></li><li>X: зарезервировано</li></ul></li><li>Остаток P: добавить P байт случайных данных перед контрольной суммой;</li><li>Метод шифрования: указывает метод шифрования для части с данными, возможные значения: <ul><li>0x00: AES-128-CFB;</li><li>0x01: без шифрования;</li><li>0x02: AES-128-GCM;</li><li>0x03: ChaCha20-Poly1305;</li></ul></li><li>Команда Cmd: <ul><li>0x01: данные TCP;</li><li>0x02: данные UDP;</li></ul></li><li>Порт Port: номер порта в формате Big Endian;</li><li>Тип адреса T: <ul><li>0x01: IPv4</li><li>0x02: доменное имя</li><li>0x03: IPv6</li></ul></li><li>Адрес A: <ul><li>Если T = 0x01, A - это 4-байтовый адрес IPv4;</li><li>Если T = 0x02, A - это 1 байт длины (L) + L байт доменного имени;</li><li>Если T = 0x03, A - это 16-байтовый адрес IPv6;</li></ul></li><li>Контрольная сумма F: хэш FNV1a всей части с командой, кроме F;</li></ul><h3 id="часть-с-данными" tabindex="-1"><a class="header-anchor" href="#часть-с-данными"><span>Часть с данными</span></a></h3><p>Если Opt(S) включена, для части с данными используется следующий формат. Фактические данные запроса разбиваются на несколько блоков, каждый из которых имеет следующий формат. После проверки всех блоков сервер пересылает их в соответствии с базовым форматом.</p><table><thead><tr><th>2 байта</th><th>L байт</th></tr></thead><tbody><tr><td>Длина L</td><td>Пакет данных</td></tr></tbody></table><p>Где:</p><ul><li>Длина L: целое число в формате Big Endian, максимальное значение 2^14; <ul><li>Если Opt(M) включена, значение L = истинное значение xor Mask. Mask = (RequestMask.NextByte() &lt;&lt; 8) + RequestMask.NextByte();</li></ul></li><li>Пакет данных: пакет данных, зашифрованный указанным методом шифрования;</li></ul><p>До завершения передачи в пакете данных должны быть фактические данные, то есть данные, отличные от длины и данных аутентификации. При завершении передачи клиент должен отправить пустой пакет данных, то есть L = 0 (без шифрования) или длину данных аутентификации (с шифрованием), чтобы сигнализировать о завершении передачи.</p><p>Формат пакета данных зависит от метода шифрования:</p><ul><li>Без шифрования: <ul><li>L байт: фактические данные;</li></ul></li><li>AES-128-CFB: вся часть с данными шифруется с помощью AES-128-CFB <ul><li>4 байта: хэш FNV1a фактических данных;</li><li>L - 4 байта: фактические данные;</li></ul></li><li>AES-128-GCM: ключ - это ключ из части с командой, вектор инициализации = count (2 байта) + IV (10 байт). count начинается с 0 и увеличивается на 1 для каждого пакета данных; IV - это байты с 3 по 12 из вектора инициализации части с командой. <ul><li>L - 16 байт: фактические данные;</li><li>16 байт: данные аутентификации GCM</li></ul></li><li>ChaCha20-Poly1305: ключ = MD5(ключ из части с командой) + MD5(MD5(ключ из части с командой)), вектор инициализации = count (2 байта) + IV (10 байт). count начинается с 0 и увеличивается на 1 для каждого пакета данных; IV - это байты с 3 по 12 из вектора инициализации части с командой. <ul><li>L - 16 байт: фактические данные;</li><li>16 байт: данные аутентификации Poly1305</li></ul></li></ul><h2 id="ответ-сервера" tabindex="-1"><a class="header-anchor" href="#ответ-сервера"><span>Ответ сервера</span></a></h2><p>Данные заголовка ответа шифруются с помощью AES-128-CFB, вектор инициализации - MD5(вектор инициализации для шифрования данных), ключ - MD5(ключ для шифрования данных). Фактические данные ответа зависят от настроек шифрования.</p><table><thead><tr><th>1 байт</th><th>1 байт</th><th>1 байт</th><th>1 байт</th><th>M байт</th><th>Оставшаяся часть</th></tr></thead><tbody><tr><td>Аутентификация ответа V</td><td>Опция Opt</td><td>Команда Cmd</td><td>Длина команды M</td><td>Содержимое команды</td><td>Фактические данные ответа</td></tr></tbody></table><p>Где:</p><ul><li>Аутентификация ответа V: должна совпадать с аутентификацией ответа V в запросе клиента;</li><li>Опция Opt: <ul><li>0x01: сервер готов повторно использовать TCP-соединение (устарело в Xray 2.23+);</li></ul></li><li>Команда Cmd: <ul><li>0x01: команда динамического порта</li></ul></li><li>Фактические данные ответа: <ul><li>Если Opt(S) в запросе включена, используется стандартный формат, в противном случае используется базовый формат.</li><li>Формат такой же, как и у данных запроса. <ul><li>Если Opt(M) включена, значение длины L = истинное значение xor Mask. Mask = (ResponseMask.NextByte() &lt;&lt; 8) + ResponseMask.NextByte();</li></ul></li></ul></li></ul><h3 id="команда-динамического-порта" tabindex="-1"><a class="header-anchor" href="#команда-динамического-порта"><span>Команда динамического порта</span></a></h3><table><thead><tr><th>1 байт</th><th>2 байта</th><th>16 байт</th><th>2 байта</th><th>1 байт</th><th>1 байт</th></tr></thead><tbody><tr><td>Зарезервировано</td><td>Порт Port</td><td>Идентификатор пользователя</td><td>AlterID</td><td>Уровень пользователя</td><td>Время действия T</td></tr></tbody></table><p>Где:</p><ul><li>Порт Port: номер порта в формате Big Endian;</li><li>Время действия T: количество минут;</li></ul><p>Когда клиент получает команду динамического порта, сервер уже открыл новый порт для связи, и клиент может отправлять данные на этот новый порт. Через T минут этот порт станет недействительным, и клиент должен будет снова использовать основной порт для связи.</p><h2 id="примечания" tabindex="-1"><a class="header-anchor" href="#примечания"><span>Примечания</span></a></h2><ul><li>Для обеспечения обратной совместимости все зарезервированные поля должны иметь значение 0.</li></ul>',37);function S(P,m){const d=a("I18nTip"),i=a("ExternalLinkIcon");return s(),r("div",null,[e(d),p,t("p",null,[l("ID эквивалентен "),t("a",u,[l("UUID"),e(i)]),l(" - это 16-байтовое случайное число, которое действует как токен. ID выглядит следующим образом: de305d54-75b4-431b-adb2-eb6b9e546014, он практически полностью случаен и может быть сгенерирован с помощью любого генератора UUID, например "),t("a",c,[l("этого"),e(i)]),l(".")]),b,_,t("ul",null,[t("li",null,[l("MD5: функция "),t("a",x,[l("MD5"),e(i)]),M]),t("li",null,[l("HMAC: функция "),t("a",f,[l("HMAC"),e(i)]),k]),t("li",null,[l("Shake: функция "),t("a",C,[l("SHA3-Shake128"),e(i)]),y])]),V])}const g=n(o,[["render",S],["__file","vmess.html.vue"]]);export{g as default};
