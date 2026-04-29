"use client";

import Image from "next/image";
import { useState } from "react";
import { HeroVideo } from "@/components/hero-video";
import { Reveal } from "@/components/reveal";
import { RsvpForm, type RsvpFormCopy } from "@/components/rsvp-form";
import { SectionHeading } from "@/components/section-heading";
import { SiteShell, type NavItem } from "@/components/site-shell";

type Language = "en" | "ru" | "de";

type PageCopy = {
  nav: NavItem[];
  hero: {
    intro: string;
    date: string;
    place: string;
    cta: string;
    tapToPlay: string;
    soundOn: string;
    mute: string;
  };
  story: {
    eyebrow: string;
    title: string;
    description: string;
    content: {
      lead: string;
      quote: string[];
      paragraphs: string[];
      signature: string[];
    };
  };
  invitation: {
    eyebrow: string;
    title: string;
    description: string;
    body: string;
  };
  schedule: {
    eyebrow: string;
    title: string;
    description: string;
    items: Array<{
      date: string;
      title: string;
      copy: string;
    }>;
  };
  dressCode: {
    eyebrow: string;
    title: string;
    intro: string;
    atmosphereTitle: string;
    atmosphereBody: string;
    guideTitle: string;
    guideBody: string;
    boardsIntro: string;
    womenTitle: string;
    menTitle: string;
    avoidTitle: string;
    closing: string;
  };
  rsvp: {
    eyebrow: string;
    title: string;
    description: string;
    info: string[];
    form: RsvpFormCopy;
  };
  footer: string;
};

const translations: Record<Language, PageCopy> = {
  en: {
    nav: [
      { label: "Home", href: "#home" },
      { label: "Story", href: "#story" },
      { label: "Invitation", href: "#invitation" },
      { label: "Schedule", href: "#schedule" },
      { label: "Dress Code", href: "#dress-code" },
      { label: "RSVP", href: "#rsvp" },
    ],
    hero: {
      intro: "We’re getting married",
      date: "September 4-6",
      place: "Lake Maggiore, Italy",
      cta: "RSVP",
      tapToPlay: "Tap for sound",
      soundOn: "Sound on",
      mute: "Mute",
    },
    story: {
      eyebrow: "A Love Written by God",
      title: "Our Story",
      description:
        "A story shaped by God's perfect timing, His faithfulness, and a love more beautiful than anything we could have written on our own.",
      content: {
        lead:
          "When the Lord writes your love story, it carries a beauty no human could ever create.",
        quote: [
          "What Jesus writes is never shallow.",
          "Never random.",
          "Never late.",
          "It is full of purpose, full of glory, and full of love.",
        ],
        paragraphs: [
          "Our story is a testimony of His timing and His faithfulness.",
          "The Lord connected us across countries, cultures, distance, and seasons of waiting. What could have seemed impossible to people was never impossible for God. He knew how to lead our steps, how to open the right doors, how to prepare our hearts, and how to bring us to one another in His perfect way.",
          "Through different nations, different journeys, and many miles between us, Jesus was writing something beautiful. He was teaching us to trust Him deeper, to wait with hope, and to believe that love born from His heart is always worth the journey.",
          "This is more than our love story.\nIt is a story of God's faithfulness.",
          "And now, with full hearts, we are so grateful to begin this new chapter together as husband and wife, surrounded by the people we love most.",
          "Thank you for being part of our story and celebrating with us the beautiful thing the Lord has done.",
        ],
        signature: ["With love,", "Julia & Rubin"],
      },
    },
    invitation: {
      eyebrow: "The Invitation",
      title: "With joy in our hearts",
      description:
        "We invite you to celebrate our wedding with us in beautiful Lake Maggiore, Italy.",
      body:
        "Between mountain air, quiet water, candlelight, and September skies, we would be honored to gather with the people we love most for a wedding weekend filled with warmth, beauty, and gratitude.",
    },
    schedule: {
      eyebrow: "Schedule",
      title: "A wedding weekend by the lake",
      description:
        "Three September days designed for presence, celebration, and beautiful shared memories.",
      items: [
        {
          date: "September 4",
          title: "Arrival & welcome gathering",
          copy: "We begin with warm embraces, sunset conversation, and a quiet first evening by the lake.",
        },
        {
          date: "September 5",
          title: "Wedding ceremony",
          copy: "Our vows, our joy, and a celebration gathered around beauty, faith, and love.",
        },
        {
          date: "September 6",
          title: "Celebration / farewell brunch",
          copy: "One final morning together to linger, give thanks, and hold the weekend close.",
        },
      ],
    },
    dressCode: {
      eyebrow: "Dress Code",
      title: "Soft, elegant, and timeless",
      intro:
        "Dear family and friends, we are so excited to celebrate this special day with you in beautiful Italy.",
      atmosphereTitle: "Wedding colors",
      atmosphereBody:
        "For our wedding, we would love to create a soft, elegant, and timeless atmosphere inspired by an Italian garden: natural beauty, warm light, white flowers, olive trees, and the romance of a summer evening.",
      guideTitle: "How to read the palette",
      guideBody:
        "We prepared these visual boards as the clearest guide for the look and feeling of the day. The ladies palette shows the soft romantic tones we love, the gentlemen palette shows the classic earthy shades that work beautifully, and the final board highlights the tones and prints we kindly ask everyone to avoid.",
      boardsIntro:
        "If you are choosing between a few options, these images are the best reference point: think refined, sun-washed, natural, and quietly elegant.",
      womenTitle: "For ladies",
      menTitle: "For gentlemen",
      avoidTitle: "Please avoid",
      closing:
        "Thank you for helping us create a beautiful and timeless atmosphere for our wedding day. We cannot wait to celebrate with you.",
    },
    rsvp: {
      eyebrow: "RSVP",
      title: "Will you join us?",
      description:
        "Please share your name, whether you can attend, the country you will travel from, and how many guests we should expect.",
      info: [
        "Celebration dates: September 4-6",
        "Main ceremony: September 5",
        "Location: Lake Maggiore, Italy",
      ],
      form: {
        fullName: "Full name",
        fullNamePlaceholder: "Your full name",
        phoneNumber: "Phone number",
        phoneNumberPlaceholder: "+1 234 567 890",
        country: "Country",
        countryPlaceholder: "Country of departure",
        attendance: "Will you attend?",
        yes: "Yes, I will come",
        no: "No, I can’t come",
        maybe: "Not sure yet",
        attendanceDays: "Which days will you attend?",
        attendanceAllDays: "I will attend all days (September 4-6)",
        attendanceWeddingOnly: "I will attend only the wedding day (September 5)",
        attendanceDaysUnsure: "Not sure yet",
        guests: "Number of guests",
        message: "Optional message",
        messagePlaceholder: "Share travel details, a note, or a blessing",
        questions: "Do you have any questions for us?",
        questionsPlaceholder: "Write your questions here",
        sending: "Sending...",
        submit: "Send RSVP",
        success: "Thank you! Your response has been received.",
        genericError: "Something went wrong while sending your response.",
      },
    },
    footer: "Rubin & Julia · Lake Maggiore, Italy · September 4-6",
  },
  ru: {
    nav: [
      { label: "Главная", href: "#home" },
      { label: "История", href: "#story" },
      { label: "Приглашение", href: "#invitation" },
      { label: "Программа", href: "#schedule" },
      { label: "Дресс-код", href: "#dress-code" },
      { label: "RSVP", href: "#rsvp" },
    ],
    hero: {
      intro: "Мы женимся",
      date: "4-6 сентября",
      place: "Озеро Маджоре, Италия",
      cta: "RSVP",
      tapToPlay: "Включить звук",
      soundOn: "Звук включён",
      mute: "Без звука",
    },
    story: {
      eyebrow: "Любовь, написанная Богом",
      title: "Наша история",
      description:
        "История, рожденная в Божье совершенное время, наполненная Его верностью и любовью, прекраснее которой мы сами никогда не смогли бы придумать.",
      content: {
        lead:
          "Когда Господь пишет вашу историю любви, в ней есть красота, которую не смог бы создать ни один человек.",
        quote: [
          "То, что пишет Иисус, никогда не бывает поверхностным.",
          "Никогда не бывает случайным.",
          "Никогда не приходит слишком поздно.",
          "В этом всегда есть смысл, слава и любовь.",
        ],
        paragraphs: [
          "Наша история — это свидетельство Его времени и Его верности.",
          "Господь соединил нас через страны, культуры, расстояния и сезоны ожидания. То, что людям могло казаться невозможным, никогда не было невозможным для Бога. Он знал, как направить наши шаги, как открыть нужные двери, как приготовить наши сердца и как привести нас друг к другу Своим совершенным путём.",
          "Через разные страны, разные пути и многие километры между нами Иисус писал нечто прекрасное. Он учил нас глубже доверять Ему, ждать с надеждой и верить, что любовь, рождённая в Его сердце, всегда стоит этого пути.",
          "Это больше, чем просто наша история любви.\nЭто история Божьей верности.",
          "И теперь, с сердцами, полными благодарности, мы счастливы начать эту новую главу вместе как муж и жена, в окружении самых любимых людей.",
          "Спасибо, что вы часть нашей истории и празднуете вместе с нами то прекрасное, что совершил Господь.",
        ],
        signature: ["С любовью,", "Юлия и Рубин"],
      },
    },
    invitation: {
      eyebrow: "Приглашение",
      title: "С радостью в сердцах",
      description:
        "Мы с любовью приглашаем вас разделить с нами радость нашей свадьбы в прекрасной Италии, на озере Маджоре.",
      body:
        "Среди горного воздуха, спокойной воды, свечей и мягкого сентябрьского света нам будет бесконечно дорого собрать самых любимых людей на свадебный уикенд, наполненный теплом, красотой и благодарностью.",
    },
    schedule: {
      eyebrow: "Программа",
      title: "Свадебный уикенд у озера",
      description:
        "Три сентябрьских дня, созданных для близости, радости и красивых общих воспоминаний.",
      items: [
        {
          date: "4 сентября",
          title: "Приезд и приветственный вечер",
          copy: "Мы начнём этот уикенд с тёплых объятий, разговоров на закате и спокойного первого вечера у озера.",
        },
        {
          date: "5 сентября",
          title: "Свадебная церемония",
          copy: "Наши клятвы, наша радость и праздник, наполненный красотой, верой и любовью.",
        },
        {
          date: "6 сентября",
          title: "Праздничный бранч и прощание",
          copy: "Ещё одно утро вместе, чтобы побыть рядом, поблагодарить друг друга и сохранить этот уикенд в сердце.",
        },
      ],
    },
    dressCode: {
      eyebrow: "Дресс-код",
      title: "Нежно, элегантно и вне времени",
      intro:
        "Дорогие родные и друзья, мы так счастливы разделить этот особенный день вместе с вами в прекрасной Италии.",
      atmosphereTitle: "Цвета свадьбы",
      atmosphereBody:
        "Для нашей свадьбы мы мечтаем создать мягкую, элегантную и вневременную атмосферу, вдохновлённую итальянским садом: природная красота, тёплый свет, белые цветы, оливковые деревья и романтика летнего вечера.",
      guideTitle: "Как пользоваться палитрой",
      guideBody:
        "Мы подготовили эти визуальные карточки как самый понятный ориентир для образов. Палитра для девушек показывает мягкие романтичные оттенки, палитра для мужчин — благородные природные тона, а последняя карточка подсказывает, каких цветов и принтов мы просим избегать.",
      boardsIntro:
        "Если вы выбираете между несколькими вариантами, ориентируйтесь прежде всего на эти изображения: всё должно быть мягким, естественным, утончённым и элегантным.",
      womenTitle: "Для девушек",
      menTitle: "Для мужчин",
      avoidTitle: "Просим избегать",
      closing:
        "Спасибо, что помогаете нам создать красивую и вневременную атмосферу в день нашей свадьбы. Мы с нетерпением ждём этого праздника вместе с вами.",
    },
    rsvp: {
      eyebrow: "RSVP",
      title: "Сможете ли вы быть с нами?",
      description:
        "Пожалуйста, укажите ваше имя, сможете ли вы приехать, из какой страны вы будете добираться и сколько гостей мы можем ожидать.",
      info: [
        "Даты празднования: 4-6 сентября",
        "Главная церемония: 5 сентября",
        "Место: озеро Маджоре, Италия",
      ],
      form: {
        fullName: "Полное имя",
        fullNamePlaceholder: "Ваше полное имя",
        phoneNumber: "Номер телефона",
        phoneNumberPlaceholder: "+7 999 123 45 67",
        country: "Страна",
        countryPlaceholder: "Страна, из которой вы приедете",
        attendance: "Сможете ли вы приехать?",
        yes: "Да, я приеду",
        no: "Нет, не смогу",
        maybe: "Пока не уверена / не уверен",
        attendanceDays: "В какие дни вы планируете быть с нами?",
        attendanceAllDays: "Я буду все дни (4-6 сентября)",
        attendanceWeddingOnly: "Я буду только в день свадьбы (5 сентября)",
        attendanceDaysUnsure: "Пока не уверена / не уверен",
        guests: "Количество гостей",
        message: "Сообщение",
        messagePlaceholder: "Детали поездки, пожелание или тёплая заметка",
        questions: "Есть ли у вас вопросы к нам?",
        questionsPlaceholder: "Напишите ваш вопрос здесь",
        sending: "Отправляем...",
        submit: "Отправить RSVP",
        success: "Спасибо! Ваш ответ получен.",
        genericError: "Что-то пошло не так при отправке ответа.",
      },
    },
    footer: "Rubin & Julia · Озеро Маджоре, Италия · 4-6 сентября",
  },
  de: {
    nav: [
      { label: "Start", href: "#home" },
      { label: "Unsere Geschichte", href: "#story" },
      { label: "Einladung", href: "#invitation" },
      { label: "Ablauf", href: "#schedule" },
      { label: "Dress Code", href: "#dress-code" },
      { label: "RSVP", href: "#rsvp" },
    ],
    hero: {
      intro: "Wir heiraten",
      date: "4.-6. September",
      place: "Lago Maggiore, Italien",
      cta: "RSVP",
      tapToPlay: "Ton einschalten",
      soundOn: "Ton an",
      mute: "Stumm",
    },
    story: {
      eyebrow: "Eine von Gott geschriebene Liebe",
      title: "Unsere Geschichte",
      description:
        "Eine Geschichte, getragen von Gottes vollkommenem Timing, Seiner Treue und einer Liebe, schöner als alles, was wir selbst je hätten schreiben können.",
      content: {
        lead:
          "Wenn der Herr eure Liebesgeschichte schreibt, trägt sie eine Schönheit in sich, die kein Mensch erschaffen könnte.",
        quote: [
          "Was Jesus schreibt, ist niemals oberflächlich.",
          "Niemals zufällig.",
          "Niemals zu spät.",
          "Es ist voller Sinn, voller Herrlichkeit und voller Liebe.",
        ],
        paragraphs: [
          "Unsere Geschichte ist ein Zeugnis Seines Timings und Seiner Treue.",
          "Der Herr hat uns über Länder, Kulturen, Entfernungen und Zeiten des Wartens hinweg miteinander verbunden. Was Menschen unmöglich erscheinen konnte, war für Gott niemals unmöglich. Er wusste, wie Er unsere Schritte führen, die richtigen Türen öffnen, unsere Herzen vorbereiten und uns auf Seinem vollkommenen Weg zueinander bringen würde.",
          "Durch verschiedene Nationen, unterschiedliche Wege und viele Kilometer zwischen uns schrieb Jesus etwas Wunderschönes. Er lehrte uns, Ihm tiefer zu vertrauen, voller Hoffnung zu warten und zu glauben, dass eine Liebe, die aus Seinem Herzen geboren ist, jeden Weg wert ist.",
          "Das ist mehr als nur unsere Liebesgeschichte.\nEs ist eine Geschichte von Gottes Treue.",
          "Und jetzt sind wir mit erfüllten Herzen unendlich dankbar, dieses neue Kapitel gemeinsam als Mann und Frau zu beginnen, umgeben von den Menschen, die wir am meisten lieben.",
          "Danke, dass ihr Teil unserer Geschichte seid und mit uns das wunderbare Werk feiert, das der Herr getan hat.",
        ],
        signature: ["In Liebe,", "Julia & Rubin"],
      },
    },
    invitation: {
      eyebrow: "Die Einladung",
      title: "Mit Freude in unseren Herzen",
      description:
        "Wir laden euch von Herzen ein, unsere Hochzeit mit uns am wunderschönen Lago Maggiore in Italien zu feiern.",
      body:
        "Zwischen Bergluft, stillem Wasser, Kerzenlicht und Septemberhimmel wäre es für uns ein großes Geschenk, die Menschen, die wir lieben, um uns zu haben und gemeinsam ein Hochzeitswochenende voller Wärme, Schönheit und Dankbarkeit zu feiern.",
    },
    schedule: {
      eyebrow: "Ablauf",
      title: "Ein Hochzeitswochenende am See",
      description:
        "Drei Septembertage voller Nähe, Freude und wunderschöner gemeinsamer Erinnerungen.",
      items: [
        {
          date: "4. September",
          title: "Anreise & Willkommensabend",
          copy: "Wir beginnen das Wochenende mit herzlichen Umarmungen, Gesprächen bei Sonnenuntergang und einem ruhigen ersten Abend am See.",
        },
        {
          date: "5. September",
          title: "Hochzeitszeremonie",
          copy: "Unsere Gelübde, unsere Freude und ein Fest voller Schönheit, Glauben und Liebe.",
        },
        {
          date: "6. September",
          title: "Brunch & Abschied",
          copy: "Ein letzter gemeinsamer Morgen, um noch einmal zusammen zu sein, dankbar zurückzublicken und das Wochenende im Herzen zu bewahren.",
        },
      ],
    },
    dressCode: {
      eyebrow: "Dress Code",
      title: "Sanft, elegant und zeitlos",
      intro:
        "Liebe Familie und Freunde, wir freuen uns von Herzen darauf, diesen besonderen Tag mit euch im wunderschönen Italien zu feiern.",
      atmosphereTitle: "Hochzeitsfarben",
      atmosphereBody:
        "Für unsere Hochzeit wünschen wir uns eine sanfte, elegante und zeitlose Atmosphäre, inspiriert von einem italienischen Garten: natürliche Schönheit, warmes Licht, weiße Blumen, Olivenbäume und die Romantik eines Sommerabends.",
      guideTitle: "So liest man die Palette",
      guideBody:
        "Wir haben diese Bildtafeln als klare Orientierung für die gewünschte Stimmung vorbereitet. Die Damenpalette zeigt sanfte romantische Nuancen, die Herrenpalette klassische natürliche Töne, und die letzte Tafel zeigt die Farben und Muster, die wir freundlich bitten zu vermeiden.",
      boardsIntro:
        "Wenn ihr zwischen mehreren Outfits wählt, orientiert euch am besten an diesen Bildern: alles sollte weich, natürlich, stilvoll und zurückhaltend elegant wirken.",
      womenTitle: "Für Damen",
      menTitle: "Für Herren",
      avoidTitle: "Bitte vermeiden",
      closing:
        "Danke, dass ihr uns helft, eine wunderschöne und zeitlose Atmosphäre für unseren Hochzeitstag zu schaffen. Wir freuen uns sehr darauf, mit euch zu feiern.",
    },
    rsvp: {
      eyebrow: "RSVP",
      title: "Werdet ihr bei uns sein?",
      description:
        "Bitte teilt uns euren Namen mit, ob ihr kommen könnt, aus welchem Land ihr anreist und mit wie vielen Gästen wir rechnen dürfen.",
      info: [
        "Feiertage: 4.-6. September",
        "Hauptzeremonie: 5. September",
        "Ort: Lago Maggiore, Italien",
      ],
      form: {
        fullName: "Vollständiger Name",
        fullNamePlaceholder: "Ihr vollständiger Name",
        phoneNumber: "Telefonnummer",
        phoneNumberPlaceholder: "+49 123 456 789",
        country: "Land",
        countryPlaceholder: "Land, aus dem ihr anreist",
        attendance: "Werdet ihr teilnehmen?",
        yes: "Ja, ich komme",
        no: "Nein, ich kann leider nicht dabei sein",
        maybe: "Noch nicht sicher",
        attendanceDays: "An welchen Tagen werdet ihr teilnehmen?",
        attendanceAllDays: "Ich werde an allen Tagen da sein (4.-6. September)",
        attendanceWeddingOnly: "Ich komme nur am Hochzeitstag (5. September)",
        attendanceDaysUnsure: "Noch nicht sicher",
        guests: "Anzahl der Gäste",
        message: "Optionale Nachricht",
        messagePlaceholder: "Reisedetails, eine Nachricht oder ein lieber Wunsch",
        questions: "Habt ihr Fragen an uns?",
        questionsPlaceholder: "Schreibt eure Frage hier",
        sending: "Wird gesendet...",
        submit: "RSVP senden",
        success: "Vielen Dank! Eure Antwort wurde erhalten.",
        genericError: "Beim Senden ist leider etwas schiefgelaufen.",
      },
    },
    footer: "Rubin & Julia · Lago Maggiore, Italien · 4.-6. September",
  },
};

const languages: Array<{ code: Language; label: string }> = [
  { code: "en", label: "EN" },
  { code: "ru", label: "RU" },
  { code: "de", label: "DE" },
];

const weddingIllustrations = [
  "/assets/italian-garden-1.png",
  "/assets/italian-garden-2.png",
  "/assets/italian-garden-3.png",
  "/assets/italian-garden-4.png",
  "/assets/italian-garden-5.png",
  "/assets/italian-garden-6.png",
] as const;

export default function HomePage() {
  const [language, setLanguage] = useState<Language>("en");
  const copy = translations[language];

  return (
    <SiteShell
      navItems={copy.nav}
      languageSwitcher={
        <div className="flex items-center gap-2">
          <div className="rounded-full border border-white/40 bg-white/70 p-1 backdrop-blur">
            {languages.map((item) => (
              <button
                key={item.code}
                type="button"
                onClick={() => setLanguage(item.code)}
                className={`rounded-full px-3 py-1.5 text-[0.68rem] uppercase tracking-[0.22em] transition ${
                  language === item.code
                    ? "bg-stoneink text-white"
                    : "text-stoneink/65 hover:bg-white"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      }
    >
      <main id="home" className="relative overflow-hidden">
        <DecorativeBackground />

        <section className="relative isolate overflow-hidden">
          <HeroVideo
            src="/assets/couple-video-2.mp4"
            tapToPlayLabel={copy.hero.tapToPlay}
            soundOnLabel={copy.hero.soundOn}
            muteLabel={copy.hero.mute}
            poster="/assets/couple-video-poster.png"
            objectPosition="center 35%"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(44,34,29,0.3),rgba(44,34,29,0.64))]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(246,218,224,0.18),transparent_30%)]" />

          <div className="relative mx-auto flex min-h-[max(620px,calc(100svh-72px))] max-w-7xl items-center px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
            <div className="max-w-4xl text-white">
              <p className="mb-5 text-[0.72rem] uppercase tracking-[0.32em] text-white/80 sm:mb-6 sm:text-sm sm:tracking-[0.4em]">
                {copy.hero.intro}
              </p>
              <h1 className="font-display text-4xl leading-[0.95] sm:text-7xl lg:text-[6.5rem]">
                Rubin Stebner
                <span className="my-3 block font-script text-3xl text-white/85 sm:my-4 sm:text-6xl">
                  &
                </span>
                Julia Goldberg
              </h1>
              <div className="mt-8 flex flex-col gap-2 text-base text-white/85 sm:mt-10 sm:flex-row sm:flex-wrap sm:items-center sm:gap-6 sm:text-lg">
                <p>{copy.hero.date}</p>
                <span className="hidden h-1 w-1 rounded-full bg-white/70 sm:block" />
                <p>{copy.hero.place}</p>
              </div>
              <a
                href="#rsvp"
                className="mt-8 inline-flex w-fit rounded-full border border-white/30 bg-white/10 px-6 py-3 text-xs uppercase tracking-[0.22em] text-white backdrop-blur transition hover:bg-white/18 sm:mt-10 sm:px-7 sm:text-sm sm:tracking-[0.24em]"
              >
                {copy.hero.cta}
              </a>
            </div>
          </div>
        </section>

        <section id="story" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <Reveal>
            <section className="relative overflow-hidden rounded-[2rem] border border-white/55 bg-white/88 p-6 shadow-glow backdrop-blur md:rounded-[2.5rem] md:p-14">
              <div className="absolute inset-0 opacity-[0.07]">
                <Image src="/assets/italian-garden-4.png" alt="" fill className="object-cover" />
              </div>
              <SectionHeading
                eyebrow={copy.story.eyebrow}
                title={copy.story.title}
                description={copy.story.description}
              />
              <div className="relative mt-8 space-y-6 md:space-y-8">
                <div className="rounded-[1.6rem] border border-white/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.97),rgba(248,242,235,0.99))] px-5 py-8 shadow-sm md:rounded-[2rem] md:px-12 md:py-14">
                  <div className="mx-auto max-w-4xl">
                    <p className="text-center font-display text-xl leading-relaxed text-stoneink sm:text-3xl md:text-[2.35rem]">
                      {copy.story.content.lead}
                    </p>

                    <blockquote className="mt-8 text-center font-display text-lg leading-relaxed text-stoneink/88 sm:text-2xl md:text-[2rem]">
                      {copy.story.content.quote.map((line) => (
                        <span key={line}>
                          {line}
                          <br />
                        </span>
                      ))}
                    </blockquote>

                    <div className="mt-10 space-y-5 text-base leading-8 text-stoneink/78 md:text-lg md:leading-9">
                      {copy.story.content.paragraphs.map((paragraph) => (
                        <p key={paragraph} className="whitespace-pre-line">
                          {paragraph}
                        </p>
                      ))}
                    </div>

                    <div className="mt-8 border-t border-stone-200/70 pt-7 text-center">
                      <p className="font-script text-2xl text-stoneink/85 md:text-3xl">
                        {copy.story.content.signature[0]}
                      </p>
                      <p className="mt-2 font-display text-xl tracking-[0.08em] text-stoneink md:text-2xl">
                        {copy.story.content.signature[1]}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid gap-5 lg:grid-cols-2">
                  <div className="relative min-h-[25rem] overflow-hidden rounded-[1.8rem] border border-white/60 shadow-glow sm:min-h-[32rem] xl:min-h-[38rem]">
                    <Image
                      src="/assets/story-couple-1.png"
                      alt="Rubin and Julia portrait"
                      fill
                      className="object-cover"
                      style={{ objectPosition: "center 32%" }}
                    />
                  </div>

                  <div className="relative min-h-[25rem] overflow-hidden rounded-[1.8rem] border border-white/60 shadow-glow sm:min-h-[32rem] xl:min-h-[38rem]">
                    <Image
                      src="/assets/story-couple-2.png"
                      alt="Rubin and Julia laughing together"
                      fill
                      className="object-cover"
                      style={{ objectPosition: "center 26%" }}
                    />
                  </div>
                </div>
              </div>
            </section>
          </Reveal>
        </section>

        <section id="invitation" className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 sm:pb-24 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
            <Reveal className="grid gap-5 sm:grid-cols-[1.15fr_0.85fr]">
              <div className="relative min-h-[440px] overflow-hidden rounded-[2.4rem] border border-white/50 shadow-glow">
                <Image
                  src="/assets/italian-garden-3.png"
                  alt="Italian wedding dinner under the mountains illustration"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="grid gap-5">
                <div className="relative min-h-[210px] overflow-hidden rounded-[2rem] border border-white/50 shadow-glow">
                  <Image
                    src="/assets/italian-garden-5.png"
                    alt="Romantic Italian wedding dinner illustration"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative min-h-[210px] overflow-hidden rounded-[2rem] border border-white/50 shadow-glow">
                  <Image
                    src="/assets/italian-garden-2.png"
                    alt="Wedding reception among olive trees illustration"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </Reveal>

            <Reveal className="h-full">
              <div className="h-full rounded-[2.5rem] border border-white/55 bg-white/94 p-8 shadow-glow backdrop-blur md:p-10">
                <div className="relative">
                  <SectionHeading
                    eyebrow={copy.invitation.eyebrow}
                    title={copy.invitation.title}
                    description={copy.invitation.description}
                    align="left"
                  />
                  <p className="mt-8 max-w-2xl text-lg leading-8 text-stoneink/75">
                    {copy.invitation.body}
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section id="schedule" className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 sm:pb-24 lg:px-8">
          <SectionHeading
            eyebrow={copy.schedule.eyebrow}
            title={copy.schedule.title}
            description={copy.schedule.description}
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {copy.schedule.items.map((item, index) => (
              <Reveal key={`${language}-${item.date}`} className="h-full">
                <article className="relative h-full overflow-hidden rounded-[2rem] border border-white/40 bg-white/88 p-8 shadow-glow backdrop-blur">
                  <div className="absolute inset-0 opacity-[0.09]">
                    <Image
                      src={index === 0 ? "/assets/italian-garden-4.png" : index === 1 ? "/assets/italian-garden-2.png" : "/assets/italian-garden-1.png"}
                      alt=""
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="absolute right-5 top-5 text-6xl font-display text-blush-200/80">
                    0{index + 1}
                  </div>
                  <div className="relative">
                    <p className="text-sm uppercase tracking-[0.32em] text-blush-600">{item.date}</p>
                    <h3 className="mt-5 max-w-xs font-display text-3xl leading-tight text-stoneink">
                      {item.title}
                    </h3>
                    <p className="mt-5 text-base leading-8 text-stoneink/75">{item.copy}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="dress-code" className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 sm:pb-24 lg:px-8">
          <Reveal>
            <div className="relative overflow-hidden rounded-[2.5rem] border border-white/55 bg-white/92 p-6 shadow-glow backdrop-blur md:p-10">
              <div className="absolute inset-0 opacity-[0.05]">
                <Image src="/assets/italian-garden-5.png" alt="" fill className="object-cover" />
              </div>
              <div className="relative">
                <SectionHeading
                  eyebrow={copy.dressCode.eyebrow}
                  title={copy.dressCode.title}
                  description={copy.dressCode.intro}
                />

                <div className="mx-auto mt-10 max-w-4xl rounded-[2rem] border border-white/60 bg-[#fffdfa] p-6 shadow-sm">
                  <p className="text-xs uppercase tracking-[0.3em] text-blush-600">
                    {copy.dressCode.atmosphereTitle}
                  </p>
                  <p className="mt-4 text-base leading-8 text-stoneink/78">
                    {copy.dressCode.atmosphereBody}
                  </p>
                  <div className="mt-6 rounded-[1.5rem] border border-stone-100 bg-white p-5">
                    <p className="text-xs uppercase tracking-[0.3em] text-blush-600">
                      {copy.dressCode.guideTitle}
                    </p>
                    <p className="mt-3 text-sm leading-7 text-stoneink/72">
                      {copy.dressCode.guideBody}
                    </p>
                    <p className="mt-4 text-sm leading-7 text-stoneink/62">
                      {copy.dressCode.boardsIntro}
                    </p>
                  </div>
                </div>

                <div className="mt-8 grid gap-8 lg:grid-cols-2 2xl:grid-cols-3">
                  <DressCodeBoard
                    title={copy.dressCode.womenTitle}
                    src="/assets/dress-code-ladies.png"
                    alt={`${copy.dressCode.womenTitle} dress code board`}
                  />
                  <DressCodeBoard
                    title={copy.dressCode.menTitle}
                    src="/assets/dress-code-gentlemen.png"
                    alt={`${copy.dressCode.menTitle} dress code board`}
                  />
                  <div className="lg:col-span-2 lg:flex lg:justify-center 2xl:col-span-1 2xl:block">
                    <div className="w-full max-w-[44rem] 2xl:max-w-none">
                      <DressCodeBoard
                        title={copy.dressCode.avoidTitle}
                        src="/assets/dress-code-avoid.png"
                        alt={`${copy.dressCode.avoidTitle} dress code board`}
                      />
                    </div>
                  </div>
                </div>

                <p className="mx-auto mt-8 max-w-4xl text-center text-base leading-8 text-stoneink/72">
                  {copy.dressCode.closing}
                </p>
              </div>
            </div>
          </Reveal>
        </section>

        <section id="rsvp" className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 sm:pb-24 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.88fr_1.12fr]">
            <Reveal>
              <div className="relative overflow-hidden rounded-[2.5rem] border border-white/55 bg-white/93 p-8 shadow-glow backdrop-blur md:p-10">
                <div className="absolute inset-0 opacity-[0.06]">
                  <Image src="/assets/italian-garden-6.png" alt="" fill className="object-cover" />
                </div>
                <div className="relative">
                  <SectionHeading
                    eyebrow={copy.rsvp.eyebrow}
                    title={copy.rsvp.title}
                    description={copy.rsvp.description}
                    align="left"
                  />
                  <div className="mt-10 space-y-5 text-base leading-8 text-stoneink/75">
                    {copy.rsvp.info.map((item) => (
                      <p key={item}>{item}</p>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal>
              <RsvpForm copy={copy.rsvp.form} />
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/40 bg-white/45">
        <div className="mx-auto max-w-7xl px-4 py-8 text-center text-sm uppercase tracking-[0.28em] text-stoneink/65 sm:px-6 lg:px-8">
          {copy.footer}
        </div>
      </footer>
    </SiteShell>
  );
}

function DressCodeBoard({
  title,
  src,
  alt,
}: {
  title: string;
  src: string;
  alt: string;
}) {
  return (
    <div className="rounded-[2rem] border border-white/55 bg-white/97 p-5 shadow-sm md:p-6">
      <p className="text-xs uppercase tracking-[0.3em] text-blush-600">{title}</p>
      <div className="relative mt-5 aspect-[1290/1451] overflow-hidden rounded-[1.5rem] border border-stone-100 bg-[#fdf9f4] shadow-sm">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-contain p-3 md:p-4"
          sizes="(max-width: 768px) 94vw, (max-width: 1536px) 46vw, 30vw"
        />
      </div>
    </div>
  );
}

function DecorativeBackground() {
  return (
    <>
      <div className="pointer-events-none absolute left-[-8%] top-[16%] hidden h-[34rem] w-[24rem] overflow-hidden rounded-[2.5rem] opacity-[0.05] blur-[2px] xl:block">
        <Image src={weddingIllustrations[0]} alt="" fill className="object-cover" />
      </div>
      <div className="pointer-events-none absolute right-[-8%] top-[34%] hidden h-[30rem] w-[22rem] overflow-hidden rounded-[2.5rem] opacity-[0.045] blur-[2px] xl:block">
        <Image src={weddingIllustrations[3]} alt="" fill className="object-cover" />
      </div>
      <div className="pointer-events-none absolute left-[10%] top-[72%] hidden h-[24rem] w-[18rem] overflow-hidden rounded-[2.5rem] opacity-[0.045] blur-[2px] xl:block">
        <Image src={weddingIllustrations[5]} alt="" fill className="object-cover" />
      </div>
    </>
  );
}
