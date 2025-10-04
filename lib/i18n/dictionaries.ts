import { DEFAULT_LOCALE, type Locale } from './config';

type NavDictionary = {
  solutions: string;
  products: string;
  capabilities: string;
  cases: string;
  insights: string;
  resources: string;
  about: string;
  contact: string;
};

type ActionsDictionary = {
  bookDemo: string;
  viewProducts: string;
  viewSolutions: string;
  contactSales: string;
  switchLocale: string;
};

type FooterDictionary = {
  copyright: string;
};

type ComponentsDictionary = {
  featureCard: {
    learnMore: string;
  };
  postCard: {
    readMore: string;
  };
};

type ContactPageDictionary = {
  title: string;
  intro: string;
  nameLabel: string;
  namePlaceholder: string;
  emailLabel: string;
  emailPlaceholder: string;
  needLabel: string;
  needPlaceholder: string;
  privacyLabel: string;
  submit: string;
};

type SolutionsPageDictionary = {
  title: string;
  intro: string;
  learnMore: string;
  relatedCasesHeading: string;
};

type CasesPageDictionary = {
  title: string;
  intro: string;
  viewDetail: string;
};

type CaseDetailDictionary = {
  clientFallback: string;
  challenge: string;
  approach: string;
  result: string;
  metricsHeading: string;
  metricsFallback: string;
  contentFallback: string;
};

type BlogPageDictionary = {
  title: string;
  intro: string;
};

type ResourcesPageDictionary = {
  title: string;
  intro: string;
  viewDetail: string;
};

type PagesDictionary = {
  contact: ContactPageDictionary;
  solutions: SolutionsPageDictionary;
  cases: CasesPageDictionary;
  blog: BlogPageDictionary;
  resources: ResourcesPageDictionary;
  caseDetail: CaseDetailDictionary;
};

type CommonDictionary = {
  brandName: string;
  nav: NavDictionary;
  actions: ActionsDictionary;
  footer: FooterDictionary;
};

export type Dictionary = {
  common: CommonDictionary;
  components: ComponentsDictionary;
  pages: PagesDictionary;
};

const dictionaries: Record<Locale, Dictionary> = {
  zh: {
    common: {
      brandName: 'MetaRadio',
      nav: {
        solutions: '解决方案',
        products: '核心产品',
        capabilities: '技术能力',
        cases: '成功案例',
        insights: '洞察',
        resources: '资源',
        about: '关于',
        contact: '联系',
      },
      actions: {
        bookDemo: '预约演示',
        viewProducts: '查看产品',
        viewSolutions: '查看解决方案',
        contactSales: '联系顾问',
        switchLocale: 'English',
      },
      footer: {
        copyright: '© MetaRadio 保留所有权利',
      },
    },
    components: {
      featureCard: {
        learnMore: '了解更多 →',
      },
      postCard: {
        readMore: '继续阅读 →',
      },
    },
    pages: {
      contact: {
        title: '联系我们',
        intro: '预约演示、索取规格书或讨论联合研发。',
        nameLabel: '姓名',
        namePlaceholder: '张三',
        emailLabel: '邮箱',
        emailPlaceholder: 'you@company.com',
        needLabel: '需求',
        needPlaceholder: '简要描述你的测试/仿真需求…',
        privacyLabel: '同意隐私政策',
        submit: '提交',
      },
      solutions: {
        title: '解决方案',
        intro: '通信测试向行业纵深拓展：机器人、无人机、汽车通信、高精度定位、虚拟路测。',
        learnMore: '了解更多 →',
        relatedCasesHeading: '相关案例',
      },
      cases: {
        title: '成功案例',
        intro: '从运营商网络调优到智能制造，我们帮助客户构建可预测的电磁环境。',
        viewDetail: '查看详情 →',
      },
      caseDetail: {
        clientFallback: 'MetaRadio 客户',
        challenge: '挑战',
        approach: '解决路径',
        result: '结果',
        metricsHeading: '关键指标',
        metricsFallback: '指标待补充。',
        contentFallback: '内容待补充。',
      },
      blog: {
        title: '洞察文章',
        intro: '分享通信仿真、动态 OTA 与虚拟路测的实践经验。',
      },
      resources: {
        title: '资料中心',
        intro: '下载白皮书、规格书和演示资料，快速了解 MetaRadio 的产品能力。',
        viewDetail: '查看详情 →',
      },
    },
  },
  en: {
    common: {
      brandName: 'MetaRadio',
      nav: {
        solutions: 'Solutions',
        products: 'Products',
        capabilities: 'Capabilities',
        cases: 'Case Studies',
        insights: 'Insights',
        resources: 'Resources',
        about: 'About',
        contact: 'Contact',
      },
      actions: {
        bookDemo: 'Book a Demo',
        viewProducts: 'View Products',
        viewSolutions: 'Explore Solutions',
        contactSales: 'Contact Sales',
        switchLocale: '中文',
      },
      footer: {
        copyright: '© MetaRadio. All rights reserved.',
      },
    },
    components: {
      featureCard: {
        learnMore: 'Learn more →',
      },
      postCard: {
        readMore: 'Continue reading →',
      },
    },
    pages: {
      contact: {
        title: 'Contact Us',
        intro: 'Book a demo, request specifications, or discuss co-development.',
        nameLabel: 'Name',
        namePlaceholder: 'Alex Chen',
        emailLabel: 'Email',
        emailPlaceholder: 'you@company.com',
        needLabel: 'Project details',
        needPlaceholder: 'Describe your testing or simulation request…',
        privacyLabel: 'I agree to the privacy policy',
        submit: 'Submit',
      },
      solutions: {
        title: 'Solutions',
        intro: 'Expanding channel intelligence into robotics, UAV, automotive, high-precision positioning, and virtual drive testing.',
        learnMore: 'Learn more →',
        relatedCasesHeading: 'Related case studies',
      },
      cases: {
        title: 'Case Studies',
        intro: 'From carrier optimisation to smart manufacturing, we deliver predictable electromagnetic environments.',
        viewDetail: 'View details →',
      },
      caseDetail: {
        clientFallback: 'MetaRadio Client',
        challenge: 'Challenge',
        approach: 'Approach',
        result: 'Outcome',
        metricsHeading: 'Key metrics',
        metricsFallback: 'Metrics coming soon.',
        contentFallback: 'Details coming soon.',
      },
      blog: {
        title: 'Insights',
        intro: 'Practical experience in communications simulation, OTA validation, and virtual drive testing.',
      },
      resources: {
        title: 'Resource Center',
        intro: 'Download whitepapers, spec sheets, and demos to explore MetaRadio capabilities.',
        viewDetail: 'View resource →',
      },
    },
  },
};

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] || dictionaries[DEFAULT_LOCALE];
}
