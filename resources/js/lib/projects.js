import { media } from './media.js'

/**
 * Shared work/project catalog for listing + detail pages.
 * Swap Unsplash URLs in media.js when local assets are ready.
 */
const images = media.work

/** @type {Record<string, { en: object, ar: object }>} */
const catalog = {
    valo: {
        en: {
            id: 'valo',
            client: 'Valo Motors',
            title: 'Custom digital showroom platform & brand system',
            category: 'platforms',
            tag: 'Platform Engineering',
            stat: 'Zero legacy debt',
            summary:
                'Engineered a full digital showroom platform from scratch — custom CMS, inventory API layer, and interactive product configurator — for an all-electric fleet brand entering market.',
            challenge:
                'Valo needed a bespoke digital product to match a premium EV lineup: off-the-shelf solutions could not deliver the configurator UX or the real-time inventory sync the sales team required.',
            solution:
                'We architected and delivered a custom full-stack platform — product configurator, test-drive booking system, CMS, and inventory API integration — with a complete brand identity system layered on top.',
            results: [
                'Custom platform shipped in 10 weeks, zero legacy dependencies',
                'Real-time inventory sync across dealership locations',
                'Booking flow reduced friction by 3 steps vs. industry standard',
            ],
            services: ['Full-Stack Platform', 'API Integration', 'Brand Identity', 'UX Engineering'],
            year: '2025',
        },
        ar: {
            id: 'valo',
            client: 'فالو موتورز',
            title: 'منصة صالة عرض رقمية مخصصة ونظام هوية',
            category: 'platforms',
            tag: 'هندسة المنصات',
            stat: 'بدون تبعيات قديمة',
            summary:
                'هندسة منصة صالة عرض رقمية كاملة من الصفر — نظام CMS مخصص وطبقة API للمخزون ومُهيِّئ المنتج التفاعلي — لعلامة مركبات كهربائية.',
            challenge:
                'احتاجت فالو منتجاً رقمياً مخصصاً يليق بتشكيلة EV الفاخرة: الحلول الجاهزة لم تكن قادرة على توفير تجربة المُهيِّئ أو المزامنة الفورية للمخزون.',
            solution:
                'صممنا وسلّمنا منصة متكاملة — مُهيِّئ المنتج ونظام حجز التجربة وCMS وتكامل API المخزون — مع نظام هوية تجارية كامل.',
            results: [
                'تسليم المنصة المخصصة في 10 أسابيع بدون تبعيات قديمة',
                'مزامنة فورية للمخزون بين مواقع الوكلاء',
                'تقليل خطوات الحجز بـ 3 خطوات عن المعيار القطاعي',
            ],
            services: ['منصة متكاملة', 'تكامل API', 'هوية العلامة', 'هندسة تجربة المستخدم'],
            year: '2025',
        },
    },
    apex: {
        en: {
            id: 'apex',
            client: 'Apex Capital',
            title: 'Client portal & automated reporting infrastructure',
            category: 'automation',
            tag: 'Automation & Data',
            stat: '8 hrs/week saved',
            summary:
                'Built an internal client portal and automated reporting pipeline that eliminated manual PDF generation and consolidated fragmented data sources.',
            challenge:
                'Reporting was assembled manually each week across spreadsheets and email chains — error-prone, time-consuming, and not suitable for enterprise client expectations.',
            solution:
                'We engineered a secure web portal with role-based access, automated data ingestion from multiple sources, and scheduled report generation — replacing the entire manual workflow.',
            results: [
                '8+ hours of manual reporting effort eliminated per week',
                'Real-time data visibility for client and leadership dashboards',
                'Unified data model across 4 previously siloed sources',
            ],
            services: ['Workflow Automation', 'Data Pipelines', 'Custom Portal', 'API Integration'],
            year: '2024',
        },
        ar: {
            id: 'apex',
            client: 'أبيكس كابيتال',
            title: 'بوابة عملاء داخلية وبنية تحتية لإعداد التقارير الآلية',
            category: 'automation',
            tag: 'الأتمتة والبيانات',
            stat: '8 ساعات موفّرة أسبوعياً',
            summary:
                'بناء بوابة عملاء داخلية وخط أنابيب تقارير آلي يلغي إنشاء PDF يدوياً ويوحّد مصادر البيانات المتفرقة.',
            challenge:
                'كان إعداد التقارير يتم يدوياً كل أسبوع عبر جداول بيانات ورسائل بريد — عرضة للأخطاء وتستغرق وقتاً وغير مناسبة لتوقعات العملاء المؤسسيين.',
            solution:
                'هندسنا بوابة ويب آمنة بصلاحيات قائمة على الأدوار وإدخال بيانات آلي من مصادر متعددة وجدولة إنشاء التقارير — لاستبدال سير العمل اليدوي بالكامل.',
            results: [
                'إلغاء أكثر من 8 ساعات من جهد إعداد التقارير اليدوية أسبوعياً',
                'رؤية بيانات فورية للوحات عملاء وقيادة',
                'نموذج بيانات موحّد عبر 4 مصادر كانت معزولة',
            ],
            services: ['أتمتة سير العمل', 'خطوط البيانات', 'بوابة مخصصة', 'تكامل API'],
            year: '2024',
        },
    },
    aether: {
        en: {
            id: 'aether',
            client: 'Aether Skincare',
            title: 'E-commerce platform rebuild & DevOps pipeline',
            category: 'platforms',
            tag: 'Platform & Deployment',
            stat: '60% faster deploys',
            summary:
                'Migrated a high-traffic e-commerce operation from a fragile legacy stack to a modern, containerized platform with automated deployment and monitoring.',
            challenge:
                'The existing platform was built on outdated dependencies causing frequent outages during peak traffic, with manual deployments that could take hours and no rollback capability.',
            solution:
                'We re-architected the platform on a containerized stack, implemented CI/CD pipelines, automated staging-to-production workflows, and set up observability dashboards to eliminate deployment risk.',
            results: [
                'Deployment time reduced from 4+ hours to under 40 minutes',
                'Zero unplanned outages in 6 months post-migration',
                'Automated rollback capability for every release',
            ],
            services: ['Platform Engineering', 'DevOps & CI/CD', 'Containerization', 'Monitoring'],
            year: '2025',
        },
        ar: {
            id: 'aether',
            client: 'إيثر للعناية بالبشرة',
            title: 'إعادة بناء منصة التجارة الإلكترونية وخط DevOps',
            category: 'platforms',
            tag: 'المنصة والنشر',
            stat: 'نشر أسرع بـ 60%',
            summary:
                'ترحيل عملية تجارة إلكترونية عالية الحركة من بنية قديمة هشة إلى منصة حديثة في حاويات مع نشر آلي ومراقبة.',
            challenge:
                'المنصة القائمة كانت مبنية على تبعيات قديمة تسبّب انقطاعات متكررة أثناء ذروة الحركة، مع عمليات نشر يدوية تستغرق ساعات بدون قدرة على التراجع.',
            solution:
                'أعدنا هيكلة المنصة على بنية في حاويات وطبّقنا خطوط CI/CD وأتمتنا سير العمل من التجهيز إلى الإنتاج وهيّأنا لوحات المراقبة للقضاء على مخاطر النشر.',
            results: [
                'تقليص وقت النشر من 4+ ساعات إلى أقل من 40 دقيقة',
                'صفر انقطاعات غير مخططة خلال 6 أشهر بعد الترحيل',
                'قدرة تراجع آلية لكل إصدار',
            ],
            services: ['هندسة المنصات', 'DevOps وCI/CD', 'الحاويات', 'المراقبة'],
            year: '2025',
        },
    },
    zeta: {
        en: {
            id: 'zeta',
            client: 'Zeta Warehouses',
            title: 'Enterprise booking platform development',
            category: 'platforms',
            tag: 'Platform Engineering',
            stat: '-34% Setup Time',
            summary:
                'Rebuilt B2B booking interfaces to accelerate onboarding and recover lost enterprise leads.',
            challenge:
                'Legacy booking tools were slow, opaque to ops teams, and leaking high-value enterprise inquiries.',
            solution:
                'Neutronix engineered a modern booking platform — UX, frontend, APIs, and deployment pipeline — tailored to warehouse operations.',
            results: [
                '34% faster onboarding and client setup time',
                'Ops team visibility into all active bookings in real time',
                'Stable CI/CD pipeline with zero-downtime deploys',
            ],
            services: ['Platform Engineering', 'API Architecture', 'UX/UI', 'DevOps'],
            year: '2024',
        },
        ar: {
            id: 'zeta',
            client: 'مستودعات زيتا',
            title: 'تطوير منصة حجز للمؤسسات',
            category: 'platforms',
            tag: 'هندسة المنصات',
            stat: '-34% وقت التهيئة',
            summary:
                'إعادة بناء واجهات الحجز بين الشركات لتسريع التهيئة واستعادة العملاء المؤسسيين.',
            challenge:
                'أدوات الحجز القديمة كانت بطيئة وغير واضحة لفرق العمليات وتُفقد استفسارات عالية القيمة.',
            solution:
                'طوّرت نيوترونيكس منصة حجز حديثة — تجربة المستخدم والواجهة وواجهات البرمجة وخط النشر — مخصّصة لعمليات المستودعات.',
            results: [
                'تقليص وقت التهيئة بنسبة 34%',
                'رؤية فورية لفرق العمليات على جميع الحجوزات النشطة',
                'خط CI/CD مستقر بنشر بدون توقف',
            ],
            services: ['هندسة المنصات', 'هندسة API', 'تجربة وواجهة المستخدم', 'DevOps'],
            year: '2024',
        },
    },
    novus: {
        en: {
            id: 'novus',
            client: 'Novus Living',
            title: 'Azure cloud migration & infrastructure modernization',
            category: 'cloud',
            tag: 'Cloud & Infrastructure',
            stat: '40% infra cost reduction',
            summary:
                'Led a full Azure cloud migration for a real estate operations group — moving legacy on-premise workloads to a secure, scalable, and cost-optimized cloud architecture.',
            challenge:
                'Aging on-premise servers were causing reliability issues and preventing the team from scaling operations. Infrastructure maintenance was consuming internal engineering resources with no path forward.',
            solution:
                'We conducted a cloud readiness assessment, designed an Azure Landing Zone, and executed a phased migration of all workloads — with cost governance policies and observability baked in from day one.',
            results: [
                '40% reduction in total infrastructure cost post-migration',
                'System uptime increased to 99.9% SLA',
                'Internal engineering hours freed from server maintenance',
            ],
            services: ['Azure Architecture', 'Cloud Migration', 'Cost Governance', 'Observability'],
            year: '2023',
        },
        ar: {
            id: 'novus',
            client: 'نوفوس ليفينج',
            title: 'ترحيل سحابي على Azure وتحديث البنية التحتية',
            category: 'cloud',
            tag: 'السحابة والبنية التحتية',
            stat: 'توفير 40% من تكاليف البنية',
            summary:
                'قيادة ترحيل سحابي كامل على Azure لمجموعة عمليات عقارية — نقل أحمال العمل القديمة المحلية إلى بنية سحابية آمنة وقابلة للتوسع ومحسّنة التكلفة.',
            challenge:
                'الخوادم القديمة محلياً كانت تسبّب مشاكل موثوقية وتمنع الفريق من توسيع العمليات. صيانة البنية التحتية كانت تستنزف موارد الهندسة الداخلية.',
            solution:
                'أجرينا تقييم الجاهزية السحابية وصممنا Azure Landing Zone ونفّذنا ترحيل مرحلي لجميع أحمال العمل مع سياسات حوكمة التكلفة والمراقبة من اليوم الأول.',
            results: [
                'تخفيض 40% من إجمالي تكلفة البنية التحتية بعد الترحيل',
                'ارتفاع وقت تشغيل النظام إلى SLA بنسبة 99.9%',
                'تحرير ساعات هندسة داخلية من صيانة الخوادم',
            ],
            services: ['هندسة Azure', 'الترحيل السحابي', 'حوكمة التكلفة', 'المراقبة'],
            year: '2023',
        },
    },
    solara: {
        en: {
            id: 'solara',
            client: 'Solara Energy',
            title: 'n8n automation stack & operational data pipeline',
            category: 'automation',
            tag: 'Automation & Integration',
            stat: '12 workflows automated',
            summary:
                'Designed and deployed a comprehensive n8n automation stack that connected CRM, ERP, field teams, and reporting into a single operational data flow — eliminating manual handoffs.',
            challenge:
                'Operations ran across disconnected tools: field data was collected manually, CRM updates were delayed, and reporting required cross-referencing three systems every week.',
            solution:
                'We built 12 n8n automation workflows covering lead routing, field data sync, invoice generation, and weekly reporting — all connected to the existing tool stack via APIs and webhooks.',
            results: [
                '12 operational workflows automated end-to-end',
                'Field-to-CRM sync time reduced from 24 hours to under 5 minutes',
                'Weekly manual reporting effort eliminated entirely',
            ],
            services: ['n8n Orchestration', 'API & Webhook Integration', 'Data Pipelines', 'CRM Automation'],
            year: '2025',
        },
        ar: {
            id: 'solara',
            client: 'سولارا للطاقة',
            title: 'منظومة أتمتة n8n وخط بيانات تشغيلية',
            category: 'automation',
            tag: 'الأتمتة والتكامل',
            stat: '12 سير عمل مؤتمت',
            summary:
                'تصميم ونشر منظومة أتمتة n8n شاملة ربطت CRM وERP والفرق الميدانية والتقارير في تدفق بيانات تشغيلي واحد.',
            challenge:
                'العمليات كانت تعمل عبر أدوات غير متصلة: البيانات الميدانية تُجمع يدوياً، تحديثات CRM متأخرة، والتقارير تتطلب الرجوع إلى ثلاثة أنظمة أسبوعياً.',
            solution:
                'بنينا 12 سير عمل أتمتة عبر n8n يشمل توجيه العملاء ومزامنة البيانات الميدانية وإنشاء الفواتير والتقارير الأسبوعية — كلها مرتبطة بالأدوات القائمة عبر APIs وWebhooks.',
            results: [
                '12 سير عمل تشغيلي مؤتمت من البداية للنهاية',
                'تقليص وقت المزامنة الميدانية-CRM من 24 ساعة إلى أقل من 5 دقائق',
                'إلغاء جهد إعداد التقارير اليدوية الأسبوعية بالكامل',
            ],
            services: ['تنسيق n8n', 'تكامل API وWebhook', 'خطوط البيانات', 'أتمتة CRM'],
            year: '2025',
        },
    },
}

export const projectIds = ['zeta', 'solara', 'apex', 'valo', 'aether', 'novus']

export function getProject(id, locale = 'en') {
    const entry = catalog[id]
    if (!entry) return null
    const data = entry[locale] ?? entry.en
    const showcase = id === 'zeta' ? buildZetaShowcase(locale) : null
    return {
        ...data,
        image: images[id],
        href: locale === 'ar' ? `/ar/work/${id}` : `/work/${id}`,
        showcase,
    }
}

function buildZetaShowcase(locale) {
    const s = media.zetaShowcase
    const ar = locale === 'ar'
    return {
        featured: {
            src: s.heroUi,
            caption: ar ? 'لوحة التحكم — نظرة عامة على الحجوزات' : 'Ops dashboard — live booking overview',
        },
        browser: [
            {
                id: 'dash',
                src: s.dashboard,
                caption: ar ? 'تحليلات الأداء والقدرة التشغيلية' : 'Performance & capacity analytics',
                url: 'app.zetawarehouses.com/analytics',
            },
            {
                id: 'book',
                src: s.booking,
                caption: ar ? 'تدفق حجز المؤسسات خطوة بخطوة' : 'Enterprise booking flow, step by step',
                url: 'app.zetawarehouses.com/book',
            },
            {
                id: 'ops',
                src: s.ops,
                caption: ar ? 'واجهة فرق العمليات اليومية' : 'Day-to-day operations console',
                url: 'app.zetawarehouses.com/ops',
            },
        ],
        mobile: {
            src: s.mobile,
            caption: ar ? 'متابعة الحجوزات من الميدان' : 'Field-ready booking status on mobile',
        },
        design: {
            src: s.designBoard,
            caption: ar ? 'نظام الواجهة والمكوّنات' : 'UI system & component board',
        },
        wide: {
            src: s.detailWide,
            caption: ar ? 'تجربة سطح المكتب كاملة' : 'Full desktop product surface',
        },
        quote: ar
            ? {
                  text: 'المنصة لم تُعد تصميم الشاشات فقط — أعادت بناء طريقة عمل فرق العمليات يومياً.',
                  role: 'مدير العمليات، مستودعات زيتا',
              }
            : {
                  text: 'This wasn’t a reskin — it rebuilt how ops teams move work every day.',
                  role: 'Operations Director, Zeta Warehouses',
              },
        labels: ar
            ? {
                  product: 'لقطات المنتج',
                  system: 'النظام في العمل',
                  craft: 'التصميم والواجهة',
                  impact: 'الأثر',
              }
            : {
                  product: 'Product screens',
                  system: 'System in use',
                  craft: 'Design craft',
                  impact: 'Impact',
              },
    }
}


export function listProjects(locale = 'en') {
    return projectIds.map((id) => getProject(id, locale)).filter(Boolean)
}

export function getRelatedProjects(id, locale = 'en', limit = 3) {
    return listProjects(locale)
        .filter((p) => p.id !== id)
        .slice(0, limit)
}

export const workFilters = {
    en: [
        { id: 'all', label: 'All Work' },
        { id: 'platforms', label: 'Platform Engineering' },
        { id: 'cloud', label: 'Cloud & Infrastructure' },
        { id: 'automation', label: 'Automation & Data' },
    ],
    ar: [
        { id: 'all', label: 'جميع الأعمال' },
        { id: 'platforms', label: 'هندسة المنصات' },
        { id: 'cloud', label: 'السحابة والبنية التحتية' },
        { id: 'automation', label: 'الأتمتة والبيانات' },
    ],
}
