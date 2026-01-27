<template>
  <div id="publications" class="hrjust-content hrjust-publications">

    <!-- List -->
    <section class="hrjust-pubList" aria-label="List of publications">
      <article
        v-for="pub in publications"
        :key="pub.id"
        class="hrjust-pubCard"
        :data-year="pub.year"
      >
        <!-- Card header with title + year -->
        <div class="hrjust-pubCard__top">
          <div class="hrjust-pubCard__topInner">
            <h3 class="hrjust-pubCard__title">
              {{ pub.subtitle }}
            </h3>
            <span class="hrjust-pubCard__year">
              {{ pub.year }}
            </span>
          </div>
        </div>

        <!-- Full-width text body -->
        <div class="hrjust-pubCard__inner">
          <div class="hrjust-pubBody">
            <header class="hrjust-pubBody__head">
              <h4 v-if="pub.title" class="hrjust-pubBody__subtitle">
                <span v-html="pub.title"></span>
              </h4>
            </header>

            <div class="hrjust-pubBody__excerpt">
              <p
                v-for="(para, idx) in pub.body"
                :key="idx"
              >
                {{ para }}
              </p>
            </div>

            <footer class="hrjust-pubMeta">
              <div class="hrjust-pubMeta__author">
                <i class="fas fa-user" aria-hidden="true"></i>
                <span>{{ pub.author }}, {{ pub.year }}</span>
              </div>
              <div class="hrjust-pubMeta__availability">
                <i class="fas fa-map-marker-alt" aria-hidden="true"></i>
                <span>Available on:</span>
                <a
                  :href="pub.linkUrl"
                  target="_blank"
                  rel="noopener"
                  class="hrjust-pubMeta__link"
                >
                  {{ pub.linkLabel }}
                </a>
              </div>
            </footer>
          </div>
        </div>
      </article>
    </section>
  </div>
</template>

<script setup>

const publications = [
  {
    id: 'pennino-2025-evolution',
    year: '2025',
    title: 'The Evolution of Civil Society Engagement to face Global Challenges',
    subtitle: 'WTI Working Paper Series',
    author: 'Martina Pennino',
    linkLabel: 'open PDF',
    linkUrl: 'https://www.hrjust-climate-claims.eu/documents/PenninoMartina.pdf',
    body: [
      'The research question this paper addresses is the identification of the subjects that can be embraced under the term “civil society” and the attempt to clarify who is encompassed by this category and who is excluded. Firstly, this paper aims to define the concept of civil society and examine the definition of civil society provided at the international level. Secondly, it focuses on the active role played by civil society actors in claiming for the protection of human rights. Thirdly, it aims at analyzing the requirements it must meet in order to participate in legal proceedings before international and regional courts.',
      'In lack of a universal definition, each court or tribunal sets its own standards for their recognition and admission. Finally, the paper focuses on the specific and growing role of civil society in climate litigation, where third-party interventions have become a strategic means of influencing legal reasoning.',
    ],
  },
  {
    id: 'heepen-2025-amicus',
    year: '2025',
    title:
      'The Role of the Amicus Curiae before the Inter-American Court of Human Rights: How Growing Civil Society Participation in the Form of a Third Intervenor Has the Potential to Shape Human Rights-Based Climate Litigation',
    subtitle: 'WTI Working Paper Series',
    author: 'Riccarda Heepen',
    linkLabel: 'BORIS Portal',
    linkUrl:
      'https://boris-portal.unibe.ch/entities/publication/0f2214a7-54db-4678-aba7-a39ba4d94332',
    body: [
      'This paper examines the evolving role of the amicus curiae before the Inter-American Court of Human Rights (IACtHR), focusing on its significance in the landmark Advisory Opinion OC-32/25 on Climate Emergency and Human Rights. With a record 263 briefs submitted, the advisory opinion illustrates the exponential rise in civil society participation in human rights-based climate litigation.',
      'Further, the working paper analyzes how civil society organizations (CSOs) have used the amicus curiae instrument in order to influence jurisprudence and expand human rights norms, such as the emerging right to a healthy climate. Amicus curiae involvement has the transformative potential to advance strategic climate litigation and strengthen the nexus between human rights and environmental protection in the Inter-American system.',
    ],
  },
  {
    id: 'milo-2025-environmental-hrj',
    year: '2025',
    title:
      'Environmental and Human Rights Justifications in Investment Arbitration: Probing the Limits of ISDS for the Adjudication of Climate-Related Disputes',
    subtitle:
      'Journal of World Investment & Trade 26, published online ahead of print',
    author: 'Caterina Milo',
    linkLabel: 'BRILL',
    linkUrl: 'https://brill.com/view/journals/jwit/26/3/article-p512_6.xml',
    body: [
      'This article examines the capacity of investment arbitration to analyze cases concerning complex issues of public international law, focusing on the challenges connected to climate-related cases. Through the analysis of arbitral awards involving environmental and human rights justifications, this article evaluates ways in which non-economic arguments may be effectively raised in investor-State dispute settlement (ISDS) and the extent to which arbitral tribunals may consider them.',
      'It is shown that ISDS adopts a binary approach; since tribunals focus primarily on investors’ rights, non-economic interests are only relevant for being either in favor or against investment protection. A further consequence of this binary approach is that, in cases where multiple non-economic interests are involved, i.e. cases of “triangulation”, ISDS is ill-equipped to balance competing non-economic interests and, therefore, to handle the complexities of climate-related disputes. This raises concerns about the role of ISDS in addressing cases involving broader issues of public interest.',
    ],
  },
  {
    id: 'alessi-2025-intersectionality',
    year: '2025',
    title:
      'Intersectionality as a legal concept? Applications and implications of the notion (within and) beyond non-discrimination law',
    subtitle:
      'BioLaw Journal – Rivista di BioDiritto, n. 1/2025, pp. 475–505',
    author: 'Nicolò Paolo Alessi',
    linkLabel: 'open PDF',
    linkUrl: 'https://teseo.unitn.it/biolaw/article/view/3503/3846',
    body: [
      'The present paper deals with the concept of intersectionality and its applications in the legal realm, with special regard to human rights law. Intersectional legal approaches have traditionally been linked to non-discrimination law, while the application in human rights law is still inconsistent, but with significant potential.',
      'The article thus focuses on the theoretical and practical developments concerning these less trodden aspects of intersectionality, to unveil in which sense it can bring innovations to legal theory and practice beyond the connection to non-discrimination. To do so, it firstly deals with the origins of the concept and subsequently focuses on its legal applications. The second part of the paper focuses on the developments of the concept of intersectionality in human rights law in general and in some specific areas thereof, i.e. climate change law, migration law, emergency law, and democratic innovations.',
    ],
  },
  {
    id: 'alessi-2025-klimaseniorinnen',
    year: '2025',
    title:
      'Verein Klimaseniorinnen and others v. Switzerland between human rights protection and human rights justification',
    subtitle:
      'Freedom, Security & Justice: European Legal Studies 1, pp. 210–236',
    author: 'Nicolò Paolo Alessi',
    linkLabel: 'open PDF',
    linkUrl: 'https://www.hrjust-climate-claims.eu/documents/FSJ.pdf',
    body: [
      'The recent decision of the European Court of Human Rights (ECtHR) on the case Verein KlimaSeniorinnen remarkably innovated its jurisprudence on environmental cases. It underlined the connection between states’ inaction, climate change and violations of human rights protected by the European Convention on Human Rights (ECHR).',
      'In addition, the ruling has brought to the forefront the particular relationship between domestic and international norms in the Swiss context, all the more peculiar when popular votes have been involved. Notably, the decision sparked prompt negative reactions by political actors and institutions and oppositions to its implementation, with implications that are still to be assessed.',
      'This article maintains that one of the reasons why such tensions have arisen is that an aspect of the Swiss stance in the dispute was overlooked, namely the employment of human rights justifications by the Swiss authorities. With the expression human rights justifications, it is here meant the use of human rights by states to legitimise their actions both at the domestic and international levels.',
    ],
  },
  {
    id: 'antoniazzi-2024-extraterritorial',
    year: '2024',
    title:
      'Extraterritorial Human Rights Obligations in the Area of Climate Change: Why the European Union Should Take Them Seriously',
    subtitle:
      'European Papers, Vol. 9, No 2, pp. 479–512',
    author: 'Chiara Tea Antoniazzi',
    linkLabel: 'open PDF',
    linkUrl:
      'https://www.hrjust-climate-claims.eu/documents/EP_eJ_2024_2_Chiara_Tea_Antoniazzi_00768.pdf',
    body: [
      'While it is by now recognised that climate change is having and will increasingly have a devastating impact on human rights and that ill-conceived climate action can also have adverse repercussions, the legal implications of these dynamics are still debated. This is particularly the case for the apparent incompatibility between the global nature of climate change and the primarily territorial nature of States’ human rights obligations.',
      'In this context, the potential human rights obligations of the European Union (EU) towards persons living in third countries when it acts – or refrains from acting – to counter climate change have been particularly neglected, notwithstanding the major role played by the EU in both contributing to and mitigating climate change.',
      'Accordingly, the Article aims to shed light on the existence and extent of EU extraterritorial human rights obligations in the area of climate change. After exploring the wide array of EU climate measures and their extensive impacts on third countries and persons living therein, the Article offers an overview of the historical evolution and current state of extraterritorial human rights obligations in general and in the context of climate change specifically, paying special attention to recent judicial and quasi-judicial developments.',
      'The Article then points to a number of peculiarities of the EU legal framework and EU climate policy to conclude that, notwithstanding potentially significant enforcement obstacles, the EU legal order could be readier than others to recognise extraterritorial human rights obligations when EU institutions act (or not) in the area of climate change.',
    ],
  },
  {
    id: 'fornale-2024-parita-genere',
    year: '2024',
    title: 'Parità di genere e cambiamenti climatici in tempi di “polycrisis”',
    subtitle:
      'In A. Di Stasi (ed.), Dalla non discriminazione alle pari opportunità, Editoriale La Scientifica',
    author: 'Elisa Fornalé',
    linkLabel: 'Zenodo',
    linkUrl: 'https://zenodo.org/records/10716027',
    body: [
      'Fornalé, E. discusses gender parity in the face of climate change and contemporary crises, contributing to comparative legal dialogues and the promotion of good practices at the University of Salerno and beyond.',
    ],
  },
  {
    id: 'nemec-2024-marmara-golu',
    year: '2024',
    title:
      'Marmara Gölü ve Ötesi: Bir iklim davası argümanı olarak gerilememe İlkesi',
    subtitle:
      'In K. Bozkurt (ed.), Küresel Isınma ve İklim Koruma Hukuku, Seçkin Yayıncılık, Istanbul',
    author: 'E. Naz Nemec',
    linkLabel: 'Seckin',
    linkUrl:
      'https://www.seckin.com.tr/kitap/kuresel-isinma-ve-iklim-koruma-hukuku-kutluhan-bozkurt-s-p-354562804?srsltid=AfmBOoqvqfwa6Z9iRSWDUQ5JBBUDitwXfnr46P5sGo-caa2JivNSefFL',
    body: [
      'Naz Nemec, E. examines the principle of non-regression in climate litigation, focusing on the case of Lake Marmara in Turkey, and highlighting its relevance for legal arguments in environmental law.',
    ],
  },
]
</script>

<style scoped>

.hrjust-publications {
  --accent: var(--hrjust-accent-3, #002d47);
  --accent-top-a: rgba(0, 45, 71, 0.16);
  --accent-top-b: rgba(0, 45, 71, 0.06);

  --card: #ffffff;
  --border-soft: rgba(10, 34, 59, 0.08);
  --border: rgba(10, 34, 59, 0.12);
  --shadow: 0 1px 0 rgba(10, 34, 59, 0.04), 0 10px 22px rgba(10, 34, 59, 0.06);
  --shadow-hover: 0 2px 0 rgba(10, 34, 59, 0.05), 0 16px 34px rgba(10, 34, 59, 0.1);

  display: grid;
  gap: 18px;
}

.hrjust-pubHeader {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  gap: 12px;
  align-items: center;
  margin-bottom: 4px;
}

.hrjust-pubHeader__icon {
  width: 42px;
  height: 42px;
  display: grid;
  place-items: center;
  border: 1px solid var(--border-soft);
  background: #fff;
}

.hrjust-pubHeader__icon i {
  font-size: 20px;
  color: var(--accent);
}

.hrjust-pubHeader__kicker {
  margin: 0 0 4px;
  font-size: 11px;
  font-weight: 850;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(11, 31, 51, 0.62);
}

.hrjust-pubHeader__title {
  margin: 0;
  font-size: 19px;
  letter-spacing: -0.02em;
  color: rgba(11, 31, 51, 0.96);
}

.hrjust-pubHeader__desc {
  margin: 6px 0 0;
  font-size: 14px;
  color: rgba(11, 31, 51, 0.72);
  max-width: 56rem;
  text-align: justify;
}

.hrjust-pubList {
  display: grid;
  gap: 14px;
}

.hrjust-pubCard {
  position: relative;
  background: var(--card);
  border: 1px solid var(--border-soft);
  box-shadow: var(--shadow);
  transition:
    transform 180ms ease,
    box-shadow 180ms ease,
    border-color 180ms ease;
}

.hrjust-pubCard__top {
  background: linear-gradient(90deg, var(--accent-top-a), var(--accent-top-b));
  border-bottom: 1px solid var(--border-soft);
}

.hrjust-pubCard__topInner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 10px 14px;
}

.hrjust-pubCard__title {
  margin: 0;
  font-size: 14px;
  font-weight: 900;
  letter-spacing: -0.01em;
  color: rgba(11, 31, 51, 0.98);
}

.hrjust-pubCard__year {
  font-size: 12px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: rgba(11, 31, 51, 0.7);
}

.hrjust-pubCard__inner {
  padding: 14px 16px 14px;
}

.hrjust-pubCard:hover {
  transform: translateY(-2px);
  border-color: var(--border);
  box-shadow: var(--shadow-hover);
}

.hrjust-pubBody {
  display: grid;
  gap: 10px;
}

.hrjust-pubBody__head {
  display: grid;
  gap: 4px;
}

.hrjust-pubBody__subtitle {
  margin: 0;
  font-size: 13px;
  font-weight: 700;
  color: var(--accent);
}

.hrjust-pubBody__subtitle i {
  font-style: italic;
}

.hrjust-pubBody__excerpt p {
  margin: 0 0 6px;
  font-size: 13.5px;
  color: #555;
  line-height: 1.55;
  text-align: justify;
}

.hrjust-pubBody__excerpt p:last-child {
  margin-bottom: 0;
}

.hrjust-pubMeta {
  margin-top: 8px;
  padding-top: 8px;
  border-top: 1px solid var(--border-soft);
  display: flex;
  flex-wrap: wrap;
  gap: 8px 14px;
  justify-content: space-between;
  align-items: center;
  font-size: 12.5px;
  color: rgba(11, 31, 51, 0.78);
}

.hrjust-pubMeta__author,
.hrjust-pubMeta__availability {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.hrjust-pubMeta i {
  font-size: 13px;
  color: #004d77;
}

.hrjust-pubMeta__link {
  color: #002d47;
  text-decoration: underline;
  font-weight: 700;
}

.hrjust-pubMeta__link:hover {
  color: #8a0a2c;
}

@media (max-width: 768px) {
  .hrjust-pubHeader {
    grid-template-columns: minmax(0, 1fr);
  }

  .hrjust-pubHeader__icon {
    order: -1;
  }

  .hrjust-pubCard__topInner {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
