
/**
 * Single source of truth for capabilities across the home grid, the
 * /services overview, the detail pages, and the footer.
 *
 * Mirrors the shape of projects.js: slug-keyed catalog, bilingual bodies,
 * locale-independent fields (category, stack) hoisted to the entry root.
 * Anything derivable is derived — a service's tone, colour, and category label
 * come from its category, and its feature chips are the deliverable titles —
 * so adding a capability means editing one entry here and nothing else.
 */

/**
 * @typedef {{ t: string, d: string }} Detail
 * @typedef {{ q: string, a: string }} Faq
 */

/** Hex mirrors of the --tone-* custom properties, for inline card styling. */
const TONE_HEX = {
    cloud: '#0EA5E9',
    engineering: '#6366F1',
    data: '#10B981',
    growth: '#F59E0B',
}

/**
 * Delivery categories. `label` is the full name used as a section heading and
 * page eyebrow; `short` is the condensed form used on space-constrained cards.
 */
const categories = {
    engineering: {
        tone: 'engineering',
        en: {
            label: 'Web & Software',
            short: 'Web & Software',
            desc: 'Websites, online stores, custom platforms, and product engineering — built to launch, perform, and grow.',
        },
        ar: {
            label: 'الويب والبرمجيات',
            short: 'الويب والبرمجيات',
            desc: 'مواقع ومتاجر إلكترونية ومنصات مخصصة وهندسة منتجات، مبنية للإطلاق والأداء والنمو.',
        },
    },
    cloud: {
        tone: 'cloud',
        en: {
            label: 'Cloud & Infrastructure',
            short: 'Cloud & Infrastructure',
            desc: 'Azure environments and the operational foundations that keep them secure, observable, and affordable.',
        },
        ar: {
            label: 'السحابة والبنية التحتية',
            short: 'السحابة والبنية التحتية',
            desc: 'بيئات Azure والأسس التشغيلية التي تبقيها آمنة وقابلة للمراقبة ومحسّنة التكلفة.',
        },
    },
    intelligence: {
        tone: 'data',
        en: {
            label: 'AI, Data & Automation',
            short: 'AI, Data & Automation',
            desc: 'AI-powered applications, connected workflows, and reliable data that help your teams make better decisions.',
        },
        ar: {
            label: 'الذكاء الاصطناعي والبيانات والأتمتة',
            short: 'الذكاء الاصطناعي والبيانات والأتمتة',
            desc: 'تطبيقات مدعومة بالذكاء الاصطناعي وسير عمل مترابط وبيانات موثوقة تساعد فرقكم على اتخاذ قرارات أفضل.',
        },
    },
    growth: {
        tone: 'growth',
        en: {
            label: 'Design & Growth',
            short: 'Design & Growth',
            desc: 'Product design, brand identity, and search visibility that help people discover, trust, and choose your business.',
        },
        ar: {
            label: 'التصميم والنمو',
            short: 'التصميم والنمو',
            desc: 'تصميم منتجات وهوية تجارية وظهور في البحث تساعد العملاء على اكتشاف نشاطكم والثقة به واختياره.',
        },
    },
}

/** @type {Record<string, { id: string, inquiryValue?: string, cat: string, stack: string[], en: object, ar: object }>} */
const catalog = {
    'azure-cloud-migration': {
        id: 'azure',
        inquiryValue: 'cloud',
        cat: 'cloud',
        stack: ['Microsoft Azure', 'Azure Landing Zones', 'Entra ID', 'Bicep / Terraform', 'Azure Monitor', 'Microsoft Defender for Cloud'],
        en: {
            title: 'Azure Cloud Architecture & Migration',
            short: 'Azure Migration',
            summary: 'Secure, scalable Azure environments planned around your workloads, governance requirements, and operating model — from assessment through migration and handover.',
            overview: [
                'Most cloud programs fail on the parts nobody scoped: identity, network boundaries, cost ownership, and who is allowed to deploy what. We start there. Before a single workload moves, we map your current estate, classify each application by migration path, and design the Azure landing zone that will hold it — subscriptions, network topology, identity model, policy guardrails, and cost allocation.',
                'Migration then runs as a sequence of small, reversible moves rather than one high-risk cutover. Each wave has a rollback path, a validation checklist, and a defined owner. You end the engagement with a documented environment your own team can operate, not a black box that only we understand.',
            ],
            outcomes: [
                'A landing zone that satisfies governance and data-residency requirements from day one',
                'Predictable monthly Azure spend with cost attributed to the teams that generate it',
                'Migration waves that can be rolled back without downtime or data loss',
                'Documented runbooks and a handover your internal team can actually operate',
            ],
            deliverables: [
                { t: 'Cloud Readiness Assessment', d: 'A workload-by-workload inventory scoring each application for rehost, refactor, or retire — with effort, risk, and dependency mapping.' },
                { t: 'Azure Landing Zones', d: 'Subscription structure, network topology, Entra ID model, and Azure Policy guardrails deployed as infrastructure-as-code.' },
                { t: 'Workload Migration', d: 'Phased migration waves with pre-flight validation, cutover runbooks, and a tested rollback path for every move.' },
                { t: 'Security & Cost Governance', d: 'Defender for Cloud baselines, budget alerts, tagging policy, and cost allocation reporting per business unit.' },
            ],
            process: [
                { t: 'Assess', d: 'We inventory the current estate, interview the teams who operate it, and produce a migration plan with sequencing, effort, and risk stated plainly.' },
                { t: 'Design', d: 'Landing zone architecture, identity model, network boundaries, and policy set — reviewed with your security and compliance stakeholders before build.' },
                { t: 'Migrate', d: 'Workloads move in waves. Each wave is validated against a checklist, monitored through cutover, and kept rollback-ready until it is signed off.' },
                { t: 'Operate & hand over', d: 'Monitoring, alerting, backup, and cost dashboards go live alongside runbooks and working sessions with your team.' },
            ],
            faqs: [
                { q: 'Can our data stay inside Qatar?', a: 'Yes. Azure has a Qatar Central region, and we design the landing zone with region pinning and Azure Policy rules that block resource creation outside approved regions — so residency is enforced by the platform, not by convention.' },
                { q: 'What if we are already partly on Azure?', a: 'That is the common case. We assess what exists, keep what is sound, and remediate what is not. Retrofitting governance onto a running estate is a normal part of the work rather than a reason to start over.' },
                { q: 'How long does a migration take?', a: 'It depends entirely on workload count and coupling. A focused estate of a few applications is typically a matter of weeks; a multi-system enterprise estate is planned in waves across months. The assessment gives you a dated plan before you commit to the build.' },
            ],
            meta: {
                title: 'Azure Cloud Migration & Architecture in Qatar',
                description: 'Azure landing zones, cloud readiness assessment, workload migration, and cost governance for organizations in Qatar. Secure, documented, and built to hand over.',
            },
        },
        ar: {
            title: 'هندسة Azure والترحيل السحابي',
            short: 'ترحيل Azure',
            summary: 'بيئات Azure آمنة وقابلة للتوسع مبنية حول أحمال العمل ومتطلبات الحوكمة ونموذج التشغيل، من التقييم حتى الترحيل والتسليم.',
            overview: [
                'تتعثر معظم البرامج السحابية في الجوانب التي لم يخطط لها أحد: الهوية وحدود الشبكة وملكية التكلفة وصلاحيات النشر. من هنا نبدأ. قبل ترحيل أي حمل عمل، نحصر البيئة الحالية ونصنّف كل تطبيق حسب مسار الترحيل المناسب، ثم نصمم منطقة الهبوط في Azure التي ستحتضنه: بنية الاشتراكات وطوبولوجيا الشبكة ونموذج الهوية وضوابط السياسات وتوزيع التكلفة.',
                'ثم يجري الترحيل كسلسلة من الخطوات الصغيرة القابلة للتراجع بدلاً من عملية تحوّل واحدة عالية المخاطر. لكل موجة مسار تراجع وقائمة تحقق ومسؤول محدد. وتنتهي المرحلة ببيئة موثّقة يستطيع فريقك تشغيلها بنفسه، لا صندوقاً مغلقاً لا نفهمه سوانا.',
            ],
            outcomes: [
                'منطقة هبوط تلبي متطلبات الحوكمة وسيادة البيانات منذ اليوم الأول',
                'إنفاق شهري متوقع على Azure مع نسب التكلفة إلى الفرق التي تولّدها',
                'موجات ترحيل قابلة للتراجع دون توقف أو فقدان بيانات',
                'أدلة تشغيل موثّقة وتسليم يستطيع فريقك الداخلي العمل به فعلياً',
            ],
            deliverables: [
                { t: 'تقييم الجاهزية السحابية', d: 'جرد لكل حمل عمل مع تقييم كل تطبيق للترحيل أو إعادة الهيكلة أو الإيقاف، مع تحديد الجهد والمخاطر والاعتماديات.' },
                { t: 'Azure Landing Zones', d: 'بنية الاشتراكات وطوبولوجيا الشبكة ونموذج Entra ID وضوابط Azure Policy، منشورة بالكامل كبنية تحتية برمجية.' },
                { t: 'ترحيل أحمال العمل', d: 'موجات ترحيل متدرجة مع تحقق مسبق وأدلة تحوّل ومسار تراجع مُختبر لكل خطوة.' },
                { t: 'حوكمة الأمان والتكلفة', d: 'خطوط أساس Defender for Cloud وتنبيهات الميزانية وسياسة الوسوم وتقارير توزيع التكلفة لكل وحدة أعمال.' },
            ],
            process: [
                { t: 'التقييم', d: 'نحصر البيئة الحالية ونقابل الفرق التي تشغّلها، ثم نُخرج خطة ترحيل بترتيب واضح وجهد ومخاطر معلنة بصراحة.' },
                { t: 'التصميم', d: 'معمارية منطقة الهبوط ونموذج الهوية وحدود الشبكة ومجموعة السياسات، تُراجَع مع مسؤولي الأمن والامتثال لديكم قبل التنفيذ.' },
                { t: 'الترحيل', d: 'تنتقل أحمال العمل على موجات. كل موجة تُختبر وفق قائمة تحقق وتُراقَب أثناء التحوّل وتبقى قابلة للتراجع حتى اعتمادها.' },
                { t: 'التشغيل والتسليم', d: 'تنطلق المراقبة والتنبيهات والنسخ الاحتياطي ولوحات التكلفة مع أدلة التشغيل وجلسات عملية مع فريقكم.' },
            ],
            faqs: [
                { q: 'هل يمكن أن تبقى بياناتنا داخل قطر؟', a: 'نعم. تتوفر منطقة Azure Qatar Central، ونصمم منطقة الهبوط بتثبيت المنطقة الجغرافية وقواعد Azure Policy التي تمنع إنشاء موارد خارج المناطق المعتمدة، فتصبح سيادة البيانات مفروضة من المنصة لا مجرد التزام إداري.' },
                { q: 'ماذا لو كنا بالفعل على Azure جزئياً؟', a: 'هذه هي الحالة الأكثر شيوعاً. نقيّم القائم ونبقي السليم منه ونعالج ما يحتاج إصلاحاً. إعادة ضبط الحوكمة على بيئة قيد التشغيل جزء طبيعي من العمل وليس سبباً للبدء من الصفر.' },
                { q: 'كم يستغرق الترحيل؟', a: 'يعتمد كلياً على عدد أحمال العمل ومدى ترابطها. البيئة المحدودة ببضعة تطبيقات تستغرق أسابيع عادة، أما بيئة المؤسسات متعددة الأنظمة فتُخطَّط على موجات تمتد لأشهر. ويمنحك التقييم خطة بتواريخ محددة قبل الالتزام بالتنفيذ.' },
            ],
            meta: {
                title: 'الترحيل السحابي وهندسة Azure في قطر',
                description: 'مناطق هبوط Azure وتقييم الجاهزية السحابية وترحيل أحمال العمل وحوكمة التكلفة للمؤسسات في قطر. آمن وموثّق وقابل للتسليم.',
            },
        },
    },

    'devops-and-reliability': {
        id: 'devops',
        cat: 'cloud',
        stack: ['Azure DevOps', 'GitHub Actions', 'Docker', 'Kubernetes', 'Terraform', 'Azure Monitor', 'Grafana'],
        en: {
            title: 'DevOps, Deployment & Reliability',
            short: 'DevOps',
            summary: 'Production pipelines and operational foundations that make releases predictable, observable, and recoverable.',
            overview: [
                'A release should be a routine event, not a Thursday-night operation with the whole team on standby. We build the pipeline that makes that true: automated builds, tests that actually gate the deploy, environment parity, and a rollback that takes one command rather than one hour.',
                'Reliability is the other half. We instrument the system so you find out about problems from a dashboard rather than a customer, define what "healthy" means in measurable terms, and make sure backup and recovery have been tested rather than merely configured.',
            ],
            outcomes: [
                'Deployments that run in minutes and can be rolled back on demand',
                'Failures surfaced by alerting before customers report them',
                'Environments reproducible from code instead of tribal memory',
                'A recovery procedure that has been rehearsed, not just written down',
            ],
            deliverables: [
                { t: 'CI/CD Pipelines', d: 'Automated build, test, and release pipelines with environment promotion, approval gates, and one-command rollback.' },
                { t: 'Containers & Microservices', d: 'Containerized workloads with sane resource limits, health probes, and orchestration sized to your actual load.' },
                { t: 'Basic Monitoring & Health Checks', d: 'Uptime checks, health probes, and threshold alerting so the platform reports obvious failures without waiting for a user to call.' },
                { t: 'Backup & Recovery', d: 'Backup policy, retention, and a documented recovery procedure validated through a live restore test.' },
            ],
            process: [
                { t: 'Audit', d: 'We review how you currently build, test, deploy, and respond to incidents, and identify the steps that break most often.' },
                { t: 'Automate', d: 'Pipelines, infrastructure-as-code, and environment definitions replace manual steps and undocumented server state.' },
                { t: 'Instrument', d: 'Metrics, logs, and traces go in, then alerts are tuned against real traffic until the signal is trustworthy.' },
                { t: 'Rehearse', d: 'We run a restore and a rollback with your team so the procedure is proven before you need it under pressure.' },
            ],
            faqs: [
                { q: 'We deploy manually today. Is that a problem?', a: 'It is workable at small scale and becomes the main source of outages as the team grows. Automating the pipeline is usually the fastest reliability win available, and it does not require rewriting the application.' },
                { q: 'Do we need Kubernetes?', a: 'Often no. Kubernetes is the right answer for genuinely multi-service, high-scale workloads, and unnecessary operational overhead for everything else. We size the platform to your load and say so plainly when a simpler option is the better engineering decision.' },
                { q: 'Can you work alongside our existing developers?', a: 'Yes, and it is the preferred model. We build the pipeline with your team rather than around it, and pair through the handover so ownership genuinely transfers.' },
            ],
            meta: {
                title: 'DevOps, CI/CD & Reliability Engineering in Qatar',
                description: 'CI/CD pipelines, containerization, monitoring, and tested backup and recovery on Azure. Predictable releases and observable systems for teams in Qatar.',
            },
        },
        ar: {
            title: 'DevOps والنشر والموثوقية',
            short: 'DevOps',
            summary: 'خطوط إنتاج وأسس تشغيلية تجعل الإصدارات قابلة للتوقع والمراقبة والاستعادة.',
            overview: [
                'ينبغي أن يكون الإصدار حدثاً روتينياً، لا عملية ليلية يقف لها الفريق بأكمله على أهبة الاستعداد. نبني خط الإنتاج الذي يحقق ذلك: بناء آلي واختبارات تحجب النشر فعلياً عند الفشل وتطابق بين البيئات وتراجع يتم بأمر واحد بدل ساعة كاملة.',
                'والموثوقية هي النصف الآخر. نزوّد النظام بأدوات القياس لتكتشف المشكلات من لوحة معلومات لا من شكوى عميل، ونحدد معنى «سليم» بمؤشرات قابلة للقياس، ونتأكد من أن النسخ الاحتياطي والاستعادة قد جُرّبا فعلاً لا أنهما مجرد إعداد مكتوب.',
            ],
            outcomes: [
                'عمليات نشر تتم في دقائق ويمكن التراجع عنها عند الطلب',
                'اكتشاف الأعطال عبر التنبيهات قبل أن يبلّغ عنها العملاء',
                'بيئات قابلة لإعادة الإنشاء من الشفرة بدل الاعتماد على الذاكرة الشخصية',
                'إجراء استعادة مُجرَّب عملياً لا مكتوب فقط',
            ],
            deliverables: [
                { t: 'خطوط CI/CD', d: 'خطوط بناء واختبار وإصدار آلية مع ترقية بين البيئات وبوابات اعتماد وتراجع بأمر واحد.' },
                { t: 'الحاويات والخدمات المصغرة', d: 'أحمال عمل في حاويات بحدود موارد منطقية وفحوص سلامة وتنسيق مُقاس على حِملك الفعلي.' },
                { t: 'المراقبة الأساسية وفحوص السلامة', d: 'فحوص توافر واختبارات سلامة وتنبيهات عند تجاوز الحدود، لتُبلّغ المنصة عن الأعطال الواضحة دون انتظار اتصال مستخدم.' },
                { t: 'النسخ الاحتياطي والاستعادة', d: 'سياسة نسخ احتياطي ومدد احتفاظ وإجراء استعادة موثّق ومُتحقَّق منه عبر اختبار استرجاع فعلي.' },
            ],
            process: [
                { t: 'التدقيق', d: 'نراجع طريقتكم الحالية في البناء والاختبار والنشر والاستجابة للحوادث، ونحدد الخطوات الأكثر عرضة للفشل.' },
                { t: 'الأتمتة', d: 'تحل خطوط الإنتاج والبنية التحتية البرمجية وتعريفات البيئات محل الخطوات اليدوية وحالة الخوادم غير الموثّقة.' },
                { t: 'القياس', d: 'ندخل المقاييس والسجلات والتتبع، ثم نضبط التنبيهات على حركة حقيقية حتى تصبح الإشارة جديرة بالثقة.' },
                { t: 'التمرين', d: 'ننفذ عملية استعادة وتراجع مع فريقكم ليصبح الإجراء مُثبتاً قبل الحاجة إليه تحت الضغط.' },
            ],
            faqs: [
                { q: 'ننشر يدوياً حالياً، هل هذه مشكلة؟', a: 'الأمر ممكن على نطاق صغير، لكنه يصبح المصدر الرئيسي للأعطال مع نمو الفريق. أتمتة خط الإنتاج عادةً أسرع مكسب متاح للموثوقية، ولا تتطلب إعادة كتابة التطبيق.' },
                { q: 'هل نحتاج Kubernetes؟', a: 'غالباً لا. Kubernetes هو الخيار الصحيح لأحمال العمل متعددة الخدمات وعالية النطاق فعلاً، وعبء تشغيلي غير مبرر فيما عدا ذلك. نُقاس المنصة على حِملكم ونصرّح بوضوح عندما يكون الخيار الأبسط هو القرار الهندسي الأفضل.' },
                { q: 'هل يمكنكم العمل مع مطورينا الحاليين؟', a: 'نعم، وهو النموذج المفضل لدينا. نبني خط الإنتاج مع فريقكم لا بمعزل عنه، ونعمل جنباً إلى جنب أثناء التسليم لتنتقل الملكية فعلياً.' },
            ],
            meta: {
                title: 'DevOps وخطوط CI/CD وهندسة الموثوقية في قطر',
                description: 'خطوط CI/CD والحاويات والمراقبة والنسخ الاحتياطي المُختبَر على Azure. إصدارات متوقعة وأنظمة قابلة للمراقبة للفرق في قطر.',
            },
        },
    },

    'observability-and-sre': {
        id: 'observability',
        cat: 'cloud',
        stack: ['Azure Monitor & Log Analytics', 'Application Insights', 'OpenTelemetry', 'ClickHouse / Self-hosted PostHog', 'Grafana', 'n8n'],
        en: {
            title: 'Proactive Observability & Site Reliability (SRE)',
            short: 'Observability',
            summary: 'End-to-end system visibility, anomaly detection, and automated alerting that catches performance bottlenecks before your customers experience them.',
            overview: [
                'Most businesses discover system failures the hard way: through angry customer support tickets, lost transactions, or a sudden database crash during peak hours. We shift your operations from reactive firefighting to proactive reliability. By instrumenting your applications and infrastructure, we establish a baseline for normal behavior. When an anomaly occurs — whether it is a slow database query, a memory leak, or a spike in API errors — the system flags it instantly.',
                'We do not just act as a passive logger; we provide a full observability platform. We trace requests across microservices, monitor user experience in the frontend, and set up automated remediation pipelines. You end up with a system that self-reports its health and a team that fixes issues before they become outages.',
            ],
            outcomes: [
                'Complete visibility into your application performance, infrastructure health, and database queries',
                'Proactive alerts triggered by behavioral anomalies, not just static thresholds',
                'Faster incident resolution through distributed tracing that points directly to the failing line of code',
                'SRE as a service: ongoing monitoring and tuning without the overhead of hiring an in-house reliability team',
            ],
            deliverables: [
                { t: 'Full-Stack Instrumentation', d: 'Seamless integration of telemetry SDKs (Application Insights, OpenTelemetry) into your codebase to track events, logs, and metrics across frontend and backend.' },
                { t: 'Smart Anomaly Detection', d: 'AI-driven baselining that learns your normal traffic patterns and alerts you only when unexpected behavior or resource exhaustion occurs — reducing alert fatigue.' },
                { t: 'Automated Incident Response', d: 'Webhook integrations, Logic Apps, and routing rules that send critical alerts to Slack or Teams, or trigger auto-scaling scripts before downtime hits.' },
                { t: 'Executive & Technical Dashboards', d: 'Custom visualization boards showing real-time uptime, API latency, error rates, and infrastructure costs for both developers and business stakeholders.' },
            ],
            process: [
                { t: 'Audit', d: 'We review your current architecture, identify blind spots in your logging, and define the critical user journeys (SLIs/SLOs) that must remain highly available.' },
                { t: 'Instrument', d: 'We deploy agents and SDKs across your servers, containers, and applications, ensuring logs, metrics, and traces are collected in a centralized workspace.' },
                { t: 'Alert & automate', d: 'We configure smart detection rules, set up incident routing to your communication channels, and build automated remediation scripts for common failures.' },
                { t: 'Monitor & optimize', d: 'Through an ongoing retainer, we monitor system health, analyze performance trends, and proactively refactor bottlenecks before they impact your users.' },
            ],
            faqs: [
                { q: 'How is this different from the monitoring in your DevOps service?', a: 'DevOps delivery includes basic monitoring and health checks — uptime probes and threshold alerts that tell you something has already broken. This is the full platform: distributed tracing across services, behavioral baselining, frontend experience monitoring, and automated remediation. One tells you the system is down; the other tells you it is about to be, and where.' },
                { q: 'Will instrumentation slow our application down?', a: 'Properly configured telemetry adds negligible overhead, typically low single-digit milliseconds per request, and sampling keeps it that way under load. We measure the application before and after instrumentation so the cost is a number you can see rather than a claim you have to accept.' },
                { q: 'Do we need to be on Azure for this?', a: 'No. Azure Monitor and Application Insights are the fastest path if you are already there, but OpenTelemetry is vendor-neutral, and we run self-hosted ClickHouse or PostHog backends where cost or data residency makes that the better fit.' },
                { q: 'What does the ongoing retainer actually cover?', a: 'Continuous review of system health and performance trends, alert tuning as traffic patterns change, incident support, and a monthly report with the bottlenecks we found and what we recommend doing about them. It is scoped in hours agreed up front, not an open-ended commitment.' },
            ],
            meta: {
                title: 'Observability & Site Reliability Engineering (SRE) in Qatar',
                description: 'Full-stack instrumentation, anomaly detection, distributed tracing, and automated incident response on Azure. Catch failures before your customers do.',
            },
        },
        ar: {
            title: 'المراقبة الاستباقية وهندسة موثوقية الأنظمة (SRE)',
            short: 'المراقبة',
            summary: 'رؤية شاملة للنظام واكتشاف للشذوذ وتنبيهات آلية ترصد اختناقات الأداء قبل أن يشعر بها عملاؤكم.',
            overview: [
                'تكتشف معظم المؤسسات أعطال أنظمتها بالطريقة الأصعب: عبر تذاكر دعم من عملاء غاضبين أو معاملات ضائعة أو تعطّل مفاجئ لقاعدة البيانات في ساعات الذروة. ننقل عملياتكم من الإطفاء التفاعلي إلى الموثوقية الاستباقية. فبتزويد تطبيقاتكم وبنيتكم بأدوات القياس نضع خط أساس للسلوك الطبيعي، وحين يقع شذوذ — سواء كان استعلاماً بطيئاً أو تسرّب ذاكرة أو ارتفاعاً في أخطاء الواجهات البرمجية — يرصده النظام فوراً.',
                'ولا نكتفي بدور المسجّل السلبي، بل نوفر منصة مراقبة كاملة. نتتبع الطلبات عبر الخدمات المصغرة ونراقب تجربة المستخدم في الواجهة الأمامية ونبني مسارات معالجة آلية. لتنتهوا بنظام يبلّغ عن حالته ذاتياً وفريق يعالج المشكلات قبل أن تتحول إلى انقطاعات.',
            ],
            outcomes: [
                'رؤية كاملة لأداء التطبيق وسلامة البنية التحتية واستعلامات قاعدة البيانات',
                'تنبيهات استباقية مدفوعة بالشذوذ السلوكي لا بالحدود الثابتة وحدها',
                'حل أسرع للحوادث عبر التتبع الموزع الذي يشير مباشرة إلى السطر البرمجي المتعثر',
                'الموثوقية كخدمة: مراقبة وضبط مستمران دون عبء توظيف فريق موثوقية داخلي',
            ],
            deliverables: [
                { t: 'تزويد شامل بأدوات القياس', d: 'دمج سلس لحزم القياس (Application Insights وOpenTelemetry) في شفرتكم لتتبع الأحداث والسجلات والمقاييس عبر الواجهة الأمامية والخلفية.' },
                { t: 'اكتشاف ذكي للشذوذ', d: 'خط أساس مدعوم بالذكاء الاصطناعي يتعلم أنماط حركتكم الطبيعية وينبّهكم فقط عند السلوك غير المتوقع أو استنزاف الموارد، فيقلّ إرهاق التنبيهات.' },
                { t: 'استجابة آلية للحوادث', d: 'تكاملات Webhook وLogic Apps وقواعد توجيه ترسل التنبيهات الحرجة إلى Slack أو Teams أو تشغّل نصوص التوسع التلقائي قبل وقوع الانقطاع.' },
                { t: 'لوحات تنفيذية وتقنية', d: 'لوحات عرض مخصصة تُظهر التوافر وزمن استجابة الواجهات ومعدلات الأخطاء وتكاليف البنية لحظياً، للمطورين ولأصحاب القرار معاً.' },
            ],
            process: [
                { t: 'التدقيق', d: 'نراجع معماريتكم الحالية ونحدد النقاط العمياء في التسجيل ونعرّف رحلات المستخدم الحرجة (SLIs/SLOs) التي يجب أن تبقى عالية التوافر.' },
                { t: 'التزويد بالقياس', d: 'ننشر الوكلاء وحزم التطوير عبر خوادمكم وحاوياتكم وتطبيقاتكم، لضمان تجميع السجلات والمقاييس والتتبع في مساحة عمل مركزية.' },
                { t: 'التنبيه والأتمتة', d: 'نضبط قواعد الاكتشاف الذكية ونهيئ توجيه الحوادث إلى قنوات تواصلكم ونبني نصوص معالجة آلية للأعطال الشائعة.' },
                { t: 'المراقبة والتحسين', d: 'عبر عقد مستمر، نراقب سلامة النظام ونحلل اتجاهات الأداء ونعالج الاختناقات استباقياً قبل أن تؤثر على مستخدميكم.' },
            ],
            faqs: [
                { q: 'ما الفرق بين هذا والمراقبة ضمن خدمة DevOps؟', a: 'يشمل تنفيذ DevOps مراقبة أساسية وفحوص سلامة، أي اختبارات توافر وتنبيهات عند تجاوز الحدود تخبركم بأن شيئاً قد تعطّل بالفعل. أما هذه فهي المنصة الكاملة: تتبع موزع عبر الخدمات وخط أساس سلوكي ومراقبة تجربة الواجهة الأمامية ومعالجة آلية. الأولى تخبركم بأن النظام متوقف، والثانية تخبركم بأنه على وشك التوقف وأين.' },
                { q: 'هل ستبطئ أدوات القياس تطبيقنا؟', a: 'القياس المضبوط جيداً يضيف عبئاً لا يُذكر، عادةً أجزاء من الألف من الثانية لكل طلب، وتحافظ آلية أخذ العينات على ذلك تحت الحِمل. ونقيس التطبيق قبل التزويد بالقياس وبعده لتكون الكلفة رقماً ترونه لا ادعاءً تقبلونه.' },
                { q: 'هل يجب أن نكون على Azure؟', a: 'لا. يمثل Azure Monitor وApplication Insights أسرع مسار إن كنتم عليها بالفعل، لكن OpenTelemetry محايد تجاه المزوّد، ونشغّل خلفيات ClickHouse أو PostHog مستضافة ذاتياً حين تجعل التكلفة أو سيادة البيانات ذلك الخيار الأنسب.' },
                { q: 'ما الذي يغطيه العقد المستمر فعلياً؟', a: 'مراجعة مستمرة لسلامة النظام واتجاهات الأداء، وضبط التنبيهات مع تغير أنماط الحركة، ودعم الحوادث، وتقرير شهري بالاختناقات التي رصدناها وتوصياتنا بشأنها. ويُحدَّد ذلك بساعات متفق عليها مسبقاً لا كالتزام مفتوح.' },
            ],
            meta: {
                title: 'المراقبة الاستباقية وهندسة موثوقية الأنظمة (SRE) في قطر',
                description: 'تزويد شامل بأدوات القياس واكتشاف الشذوذ والتتبع الموزع والاستجابة الآلية للحوادث على Azure. ارصدوا الأعطال قبل عملائكم.',
            },
        },
    },

    'custom-software-platforms': {
        id: 'platforms',
        inquiryValue: 'software',
        cat: 'engineering',
        stack: ['Laravel', 'Svelte', 'PostgreSQL', 'Redis', 'REST & Webhooks', 'Azure App Service'],
        en: {
            title: 'Full-Stack Platforms & Custom Systems',
            short: 'Platforms',
            summary: 'Business-critical web platforms, portals, internal tools, and APIs engineered around real workflows rather than off-the-shelf limitations.',
            overview: [
                'Off-the-shelf software is the right choice until the day your process has to bend to fit the tool. When that starts costing you staff hours, workarounds, and spreadsheets running alongside the system, a custom platform becomes the cheaper option — provided it is built to be maintained.',
                'We engineer platforms around how your organization actually works: the approval chains, the roles, the exceptions, the reporting your management genuinely asks for. The result is a system your team owns, with source code, documentation, and an architecture that a future developer can pick up without archaeology.',
            ],
            outcomes: [
                'One system of record instead of a tool plus the spreadsheets working around it',
                'Roles and permissions that mirror your real approval chain',
                'An API layer that lets the platform connect to whatever comes next',
                'Full source ownership with documentation and no vendor lock-in',
            ],
            deliverables: [
                { t: 'Custom Web Platforms', d: 'Business applications built to your workflow, with role-based access, audit trails, and reporting designed around real decisions.' },
                { t: 'Enterprise Portals', d: 'Client, partner, or staff portals with secure authentication, document handling, and self-service that reduces inbound requests.' },
                { t: 'API Architecture', d: 'Documented, versioned APIs with authentication, rate limiting, and webhooks so other systems can integrate cleanly.' },
                { t: 'Internal Business Systems', d: 'Operational tools for the processes no commercial product covers — inventory, scheduling, approvals, compliance tracking.' },
            ],
            process: [
                { t: 'Map the workflow', d: 'We sit with the people doing the work, document the process as it actually runs, and separate the essential rules from the accumulated workarounds.' },
                { t: 'Design & prototype', d: 'Data model, permissions, and interface designed and reviewed as a working prototype before production engineering begins.' },
                { t: 'Build in increments', d: 'Functional slices ship for review on a regular cadence, so priorities can shift on evidence rather than on assumptions made in month one.' },
                { t: 'Deploy & support', d: 'Production deployment on Azure with monitoring, user training, documentation, and a defined support window after launch.' },
            ],
            faqs: [
                { q: 'How is this different from buying a SaaS product?', a: 'SaaS is faster and cheaper when your process is standard. Custom becomes the better investment when the standard product forces changes to how you operate, when per-seat pricing scales badly for you, or when the data needs to stay under your control.' },
                { q: 'Do we own the code?', a: 'Yes, entirely. Source code, infrastructure definitions, and documentation are yours, in your repositories and your Azure tenancy. You are free to take the system to another team at any point.' },
                { q: 'What happens after launch?', a: 'We agree a support arrangement up front — typically a warranty period covering defects, then an optional retainer for enhancements. We also hand over to your internal developers where you have them.' },
            ],
            meta: {
                title: 'Custom Software Development & Web Platforms in Qatar',
                description: 'Custom web platforms, enterprise portals, internal business systems, and API architecture engineered in Doha. Full source ownership, no vendor lock-in.',
            },
        },
        ar: {
            title: 'المنصات المتكاملة والأنظمة المخصصة',
            short: 'المنصات',
            summary: 'منصات أعمال وبوابات وأدوات داخلية وواجهات برمجية مصممة حول سير العمل الحقيقي بدلاً من قيود الحلول الجاهزة.',
            overview: [
                'تبقى البرمجيات الجاهزة الخيار الصحيح إلى أن يأتي اليوم الذي تضطر فيه عملياتكم للانحناء لتناسب الأداة. وحين يبدأ ذلك بتكلفة ساعات عمل وحلول التفافية وجداول بيانات موازية للنظام، تصبح المنصة المخصصة الخيار الأقل كلفة، بشرط أن تُبنى لتكون قابلة للصيانة.',
                'نهندس المنصات حول طريقة عمل مؤسستكم فعلياً: سلاسل الاعتماد والأدوار والاستثناءات والتقارير التي تطلبها الإدارة حقاً. والنتيجة نظام يملكه فريقكم، بشفرة مصدرية وتوثيق ومعمارية يستطيع أي مطور لاحق استلامها دون عناء التنقيب.',
            ],
            outcomes: [
                'نظام مرجعي واحد بدل أداة يحيط بها عدد من جداول البيانات',
                'أدوار وصلاحيات تعكس سلسلة الاعتماد الحقيقية لديكم',
                'طبقة واجهات برمجية تتيح ربط المنصة بما سيأتي لاحقاً',
                'ملكية كاملة للشفرة مع توثيق ودون ارتباط بمزوّد',
            ],
            deliverables: [
                { t: 'منصات ويب مخصصة', d: 'تطبيقات أعمال مبنية على سير عملكم، مع صلاحيات حسب الدور وسجلات تدقيق وتقارير مصممة حول قرارات حقيقية.' },
                { t: 'بوابات المؤسسات', d: 'بوابات للعملاء أو الشركاء أو الموظفين بمصادقة آمنة وإدارة مستندات وخدمة ذاتية تقلل الطلبات الواردة.' },
                { t: 'هندسة الواجهات البرمجية', d: 'واجهات برمجية موثّقة ومُصدَّرة بإصدارات، مع مصادقة وتحديد معدلات وWebhooks لتتكامل الأنظمة الأخرى بنظافة.' },
                { t: 'أنظمة الأعمال الداخلية', d: 'أدوات تشغيلية للعمليات التي لا يغطيها أي منتج تجاري: المخزون والجدولة والاعتمادات ومتابعة الامتثال.' },
            ],
            process: [
                { t: 'رسم سير العمل', d: 'نجلس مع من ينفذون العمل ونوثّق العملية كما تجري فعلاً، ونفصل القواعد الجوهرية عن الحلول الالتفافية المتراكمة.' },
                { t: 'التصميم والنموذج', d: 'نموذج البيانات والصلاحيات والواجهة تُصمَّم وتُراجَع كنموذج أولي عامل قبل بدء هندسة الإنتاج.' },
                { t: 'البناء التدريجي', d: 'تُسلَّم شرائح وظيفية للمراجعة بوتيرة منتظمة، لتتغير الأولويات بناءً على الأدلة لا على افتراضات الشهر الأول.' },
                { t: 'النشر والدعم', d: 'نشر إنتاجي على Azure مع المراقبة وتدريب المستخدمين والتوثيق ونافذة دعم محددة بعد الإطلاق.' },
            ],
            faqs: [
                { q: 'ما الفرق بين هذا وشراء منتج SaaS؟', a: 'حلول SaaS أسرع وأقل تكلفة عندما تكون عملياتكم قياسية. ويصبح التخصيص استثماراً أفضل حين يفرض المنتج الجاهز تغيير طريقة عملكم، أو حين يصبح التسعير لكل مستخدم مرهقاً مع النمو، أو حين تحتاج البيانات أن تبقى تحت سيطرتكم.' },
                { q: 'هل نملك الشفرة؟', a: 'نعم بالكامل. الشفرة المصدرية وتعريفات البنية التحتية والتوثيق ملك لكم، ضمن مستودعاتكم وبيئة Azure الخاصة بكم. ولكم مطلق الحرية في نقل النظام إلى فريق آخر في أي وقت.' },
                { q: 'ماذا يحدث بعد الإطلاق؟', a: 'نتفق على ترتيب الدعم مسبقاً، وعادةً فترة ضمان تغطي العيوب ثم عقد اختياري للتحسينات. كما نُسلّم لمطوريكم الداخليين حيثما وُجدوا.' },
            ],
            meta: {
                title: 'تطوير البرمجيات المخصصة ومنصات الويب في قطر',
                description: 'منصات ويب مخصصة وبوابات مؤسسية وأنظمة أعمال داخلية وهندسة واجهات برمجية من الدوحة. ملكية كاملة للشفرة دون ارتباط بمزوّد.',
            },
        },
    },

    'mvp-product-engineering': {
        id: 'mvp',
        inquiryValue: 'startup',
        cat: 'engineering',
        stack: ['Laravel', 'Svelte', 'PostgreSQL', 'Figma', 'Azure', 'Stripe / Payment Gateways'],
        en: {
            title: 'MVP & Product Engineering',
            short: 'MVP Engineering',
            summary: 'A disciplined path from product idea to a validated, production-ready release for founders and innovation teams.',
            overview: [
                'The failure mode for a first product is not building it badly — it is building too much of it before anyone has confirmed the idea. We scope an MVP around the single assumption your business depends on, build only what tests that assumption, and ship it to real users while the budget still has room for what you learn.',
                'That does not mean throwaway code. The MVP runs on the same architecture the scaled product would use, so a validated idea continues forward rather than being rebuilt from zero on the day it starts working.',
            ],
            outcomes: [
                'A live product in front of real users in weeks rather than quarters',
                'Scope tied to the assumption that actually decides whether the business works',
                'A codebase that scales forward instead of needing a rewrite after validation',
                'A prioritized roadmap based on usage evidence, not opinion',
            ],
            deliverables: [
                { t: 'Product Discovery', d: 'Problem framing, user and competitor research, and a scoped feature set with an explicit list of what we are deliberately not building yet.' },
                { t: 'UX/UI Engineering', d: 'Interface design and interactive prototypes validated with users before engineering time is committed to them.' },
                { t: 'MVP Development', d: 'A production-quality release covering the core flow, with authentication, payments, and analytics wired in from the start.' },
                { t: 'Scale-Up Roadmaps', d: 'Post-launch instrumentation and a prioritized roadmap driven by what users actually did rather than what they said they would do.' },
            ],
            process: [
                { t: 'Frame', d: 'We identify the riskiest assumption in the business model and define what evidence would confirm or kill it.' },
                { t: 'Prototype', d: 'An interactive prototype tests the core flow with real users before a line of production code is written.' },
                { t: 'Build', d: 'Weekly increments on production architecture, with analytics instrumented so launch produces data and not just a launch.' },
                { t: 'Learn & iterate', d: 'Usage review after release, then a prioritized next phase — or an honest recommendation to change direction.' },
            ],
            faqs: [
                { q: 'How much does an MVP cost?', a: 'It scales with the core flow, not with the ambition of the vision. We scope to a fixed budget by cutting features rather than by cutting engineering quality, and we tell you before we start if the budget and the scope do not meet.' },
                { q: 'Will the MVP need rebuilding if it succeeds?', a: 'Not if it is built properly. We use the same stack and architecture that the scaled product needs. The MVP is smaller in scope, not lower in engineering standard.' },
                { q: 'Do you take equity instead of fees?', a: 'We work on a fee basis. It keeps incentives clear and means our recommendation on scope is not influenced by anything other than what serves the product.' },
            ],
            meta: {
                title: 'MVP Development & Product Engineering for Startups in Qatar',
                description: 'Product discovery, UX prototyping, and production-ready MVP development for founders and innovation teams in Qatar. Built to scale past validation.',
            },
        },
        ar: {
            title: 'هندسة المنتجات والنماذج الأولية',
            short: 'هندسة MVP',
            summary: 'مسار منضبط من فكرة المنتج إلى إصدار مُثبت وجاهز للإنتاج للمؤسسين وفرق الابتكار.',
            overview: [
                'ليست مشكلة المنتج الأول أن يُبنى بسوء، بل أن يُبنى أكثر مما ينبغي قبل أن يؤكد أحد صحة الفكرة. نحدد نطاق المنتج الأولي حول الافتراض الوحيد الذي يقوم عليه نشاطكم، ونبني ما يختبر هذا الافتراض فقط، ونطلقه لمستخدمين حقيقيين والميزانية ما زالت تتسع لما ستتعلمونه.',
                'وهذا لا يعني شفرة للاستهلاك المؤقت. يعمل المنتج الأولي على المعمارية نفسها التي سيستخدمها المنتج الموسّع، فتمضي الفكرة المُثبتة قدماً بدل إعادة بنائها من الصفر يوم تبدأ في النجاح.',
            ],
            outcomes: [
                'منتج حي أمام مستخدمين حقيقيين خلال أسابيع لا أرباع سنة',
                'نطاق مرتبط بالافتراض الذي يحسم فعلاً جدوى النشاط',
                'قاعدة شفرة تتوسع للأمام بدل الحاجة لإعادة كتابة بعد التحقق',
                'خارطة طريق مرتبة حسب أدلة الاستخدام لا حسب الآراء',
            ],
            deliverables: [
                { t: 'اكتشاف المنتج', d: 'تأطير المشكلة وبحث المستخدمين والمنافسين ومجموعة ميزات محددة، مع قائمة صريحة بما لن نبنيه عمداً في هذه المرحلة.' },
                { t: 'هندسة UX/UI', d: 'تصميم الواجهات ونماذج تفاعلية يتم التحقق منها مع المستخدمين قبل تخصيص وقت هندسي لها.' },
                { t: 'تطوير MVP', d: 'إصدار بجودة إنتاجية يغطي المسار الأساسي، مع المصادقة والمدفوعات والتحليلات مدمجة منذ البداية.' },
                { t: 'خطط التوسع', d: 'أدوات قياس بعد الإطلاق وخارطة طريق مرتبة وفق ما فعله المستخدمون فعلاً لا وفق ما قالوا إنهم سيفعلونه.' },
            ],
            process: [
                { t: 'التأطير', d: 'نحدد الافتراض الأعلى مخاطرة في نموذج العمل ونعرّف الدليل الذي يؤكده أو ينفيه.' },
                { t: 'النموذج الأولي', d: 'نموذج تفاعلي يختبر المسار الأساسي مع مستخدمين حقيقيين قبل كتابة أي سطر إنتاجي.' },
                { t: 'البناء', d: 'إضافات أسبوعية على معمارية إنتاجية، مع تحليلات مدمجة ليُنتج الإطلاق بيانات لا مجرد إطلاق.' },
                { t: 'التعلّم والتكرار', d: 'مراجعة الاستخدام بعد الإصدار ثم مرحلة تالية مرتبة الأولويات، أو توصية صريحة بتغيير الاتجاه.' },
            ],
            faqs: [
                { q: 'كم تكلفة المنتج الأولي؟', a: 'تتناسب مع المسار الأساسي لا مع طموح الرؤية. نحدد النطاق ضمن ميزانية ثابتة بتقليص الميزات لا بتقليص الجودة الهندسية، ونخبركم قبل البدء إن كانت الميزانية والنطاق غير متوافقين.' },
                { q: 'هل سنحتاج إعادة بناء المنتج إذا نجح؟', a: 'لا إذا بُني بشكل صحيح. نستخدم المنصة والمعمارية نفسها التي يحتاجها المنتج الموسّع. المنتج الأولي أصغر نطاقاً وليس أدنى معياراً هندسياً.' },
                { q: 'هل تقبلون حصة بدل الأتعاب؟', a: 'نعمل بنظام الأتعاب. هذا يبقي الحوافز واضحة ويعني أن توصيتنا بشأن النطاق لا يوجّهها شيء سوى مصلحة المنتج.' },
            ],
            meta: {
                title: 'تطوير المنتجات الأولية وهندسة المنتجات للشركات الناشئة في قطر',
                description: 'اكتشاف المنتج والنماذج التفاعلية وتطوير منتج أولي جاهز للإنتاج للمؤسسين وفرق الابتكار في قطر، مبني ليتوسع بعد التحقق.',
            },
        },
    },

    'workflow-automation': {
        id: 'automation',
        cat: 'intelligence',
        stack: ['n8n', 'Azure Logic Apps', 'REST APIs', 'Webhooks', 'Microsoft 365', 'Azure Functions'],
        en: {
            title: 'Workflow Automation & Integration',
            short: 'Automation',
            summary: 'Connected workflows that remove repetitive work and move information reliably between your teams, tools, and customers.',
            overview: [
                'Most organizations lose more hours to copying data between systems than to any single piece of software being slow. A record is created in one tool, retyped into a second, emailed to an approver, then reconciled in a spreadsheet at month end. Every step is a place for the process to stall or the data to drift.',
                'We replace those handoffs with orchestrated workflows. Systems talk to each other directly, approvals route themselves and escalate when they stall, and every run is logged and retried on failure — so automation makes the process more auditable, not less.',
            ],
            outcomes: [
                'Staff hours returned from data entry and chasing approvals',
                'One consistent record across systems instead of divergent copies',
                'Failures retried and escalated automatically rather than discovered late',
                'A full audit log of every automated run, input, and outcome',
            ],
            deliverables: [
                { t: 'n8n Orchestration', d: 'Self-hosted workflow orchestration inside your Azure tenancy, with version control, credential management, and execution logging.' },
                { t: 'System Connectors', d: 'Integrations between your CRM, ERP, finance, HR, and communication tools, including systems with no public API.' },
                { t: 'Approval Workflows', d: 'Multi-step approval routing with delegation, escalation on delay, and a complete decision trail for audit.' },
                { t: 'API & Webhook Integration', d: 'Event-driven integrations with retry logic, idempotency, and dead-letter handling so nothing is silently dropped.' },
            ],
            process: [
                { t: 'Map the handoffs', d: 'We trace how information moves between systems and people today, and quantify the time and error rate at each manual step.' },
                { t: 'Prioritize', d: 'Workflows are ranked by hours saved against build effort, so the first automation delivers a visible return rather than a demo.' },
                { t: 'Build & test', d: 'Each workflow runs in parallel with the manual process until its output has matched for a full cycle.' },
                { t: 'Monitor & extend', d: 'Execution dashboards and failure alerts go live, then the next tier of workflows is built on the proven foundation.' },
            ],
            faqs: [
                { q: 'What if one of our systems has no API?', a: 'That is common with older or local systems. Depending on what it exposes we integrate at the database level, through scheduled file exchange, or through a controlled browser automation. We confirm which is viable during the mapping phase rather than promising in advance.' },
                { q: 'Why self-hosted n8n rather than a cloud automation service?', a: 'Running n8n inside your own Azure tenancy keeps business data within your governance boundary, avoids per-execution pricing that punishes success, and lets you keep the workflows if we ever part ways.' },
                { q: 'What happens when an automation fails?', a: 'It retries with backoff, and if it still cannot complete, it alerts a named owner and preserves the payload for reprocessing. Nothing fails silently — that is the difference between automation and a script somebody wrote once.' },
            ],
            meta: {
                title: 'Workflow Automation & System Integration in Qatar',
                description: 'n8n orchestration, system connectors, approval workflows, and API integration hosted in your Azure tenancy. Remove manual handoffs across your business.',
            },
        },
        ar: {
            title: 'أتمتة سير العمل والتكامل',
            short: 'الأتمتة',
            summary: 'سير عمل مترابط يلغي المهام المتكررة وينقل المعلومات بموثوقية بين الفرق والأدوات والعملاء.',
            overview: [
                'تفقد معظم المؤسسات ساعات في نسخ البيانات بين الأنظمة أكثر مما تفقده بسبب بطء أي برنامج بعينه. يُنشأ السجل في أداة، ثم يُعاد إدخاله في ثانية، ثم يُرسل بالبريد إلى معتمِد، ثم تتم تسويته في جدول بيانات نهاية الشهر. وكل خطوة من هذه موضع محتمل لتعطّل العملية أو انحراف البيانات.',
                'نستبدل هذه التسليمات اليدوية بسير عمل منسّق. تتخاطب الأنظمة مباشرة، وتتوجه الاعتمادات ذاتياً وتتصاعد عند التأخر، وتُسجَّل كل عملية وتُعاد المحاولة عند الفشل، فتزيد الأتمتة قابلية التدقيق بدل أن تقللها.',
            ],
            outcomes: [
                'استعادة ساعات عمل الموظفين من الإدخال اليدوي وملاحقة الاعتمادات',
                'سجل واحد متسق عبر الأنظمة بدل نسخ متباينة',
                'إعادة محاولة الأعطال وتصعيدها آلياً بدل اكتشافها متأخراً',
                'سجل تدقيق كامل لكل تشغيل آلي ومدخلاته ونتيجته',
            ],
            deliverables: [
                { t: 'تنسيق n8n', d: 'تنسيق سير عمل مستضاف ذاتياً داخل بيئة Azure الخاصة بكم، مع إدارة إصدارات وبيانات اعتماد وسجلات تنفيذ.' },
                { t: 'موصلات الأنظمة', d: 'تكاملات بين أنظمة إدارة العملاء وتخطيط الموارد والمالية والموارد البشرية وأدوات التواصل، بما فيها الأنظمة بلا واجهة برمجية عامة.' },
                { t: 'مسارات الموافقات', d: 'توجيه اعتمادات متعدد المراحل مع التفويض والتصعيد عند التأخر وسجل قرارات كامل لأغراض التدقيق.' },
                { t: 'تكامل API وWebhooks', d: 'تكاملات مدفوعة بالأحداث مع منطق إعادة المحاولة ومنع التكرار ومعالجة الرسائل المتعذرة كي لا يسقط شيء بصمت.' },
            ],
            process: [
                { t: 'رسم التسليمات', d: 'نتتبع كيف تتحرك المعلومات بين الأنظمة والأشخاص اليوم، ونقيس الوقت ومعدل الخطأ عند كل خطوة يدوية.' },
                { t: 'ترتيب الأولويات', d: 'تُرتَّب المسارات حسب الساعات الموفَّرة مقابل جهد البناء، لتحقق الأتمتة الأولى عائداً ملموساً لا مجرد عرض توضيحي.' },
                { t: 'البناء والاختبار', d: 'يعمل كل مسار بالتوازي مع العملية اليدوية إلى أن تتطابق مخرجاته على مدى دورة كاملة.' },
                { t: 'المراقبة والتوسيع', d: 'تنطلق لوحات التنفيذ وتنبيهات الفشل، ثم تُبنى الطبقة التالية من المسارات على أساس مُثبت.' },
            ],
            faqs: [
                { q: 'ماذا لو كان أحد أنظمتنا بلا واجهة برمجية؟', a: 'هذا شائع مع الأنظمة القديمة أو المحلية. وبحسب ما يتيحه النظام، نتكامل على مستوى قاعدة البيانات أو عبر تبادل ملفات مجدول أو عبر أتمتة متصفح محكومة. ونحدد الخيار الممكن أثناء مرحلة الرسم بدل الوعد به مسبقاً.' },
                { q: 'لماذا n8n مستضاف ذاتياً بدل خدمة أتمتة سحابية؟', a: 'تشغيل n8n داخل بيئة Azure الخاصة بكم يُبقي بيانات العمل ضمن نطاق حوكمتكم، ويتجنب التسعير بعدد العمليات الذي يعاقب النجاح، ويتيح لكم الاحتفاظ بالمسارات إن افترقت طرقنا يوماً.' },
                { q: 'ماذا يحدث عند فشل الأتمتة؟', a: 'تُعاد المحاولة بفواصل متزايدة، وإن تعذّر الإتمام يُنبَّه مسؤول محدد بالاسم ويُحفظ المحتوى لإعادة المعالجة. لا شيء يفشل بصمت، وهذا هو الفرق بين الأتمتة وبين سكربت كتبه أحدهم مرة.' },
            ],
            meta: {
                title: 'أتمتة سير العمل وتكامل الأنظمة في قطر',
                description: 'تنسيق n8n وموصلات الأنظمة ومسارات الموافقات وتكامل الواجهات البرمجية داخل بيئة Azure الخاصة بكم. أزيلوا التسليمات اليدوية من عملياتكم.',
            },
        },
    },

    'data-analytics-business-intelligence': {
        id: 'data',
        cat: 'intelligence',
        stack: ['Azure Data Factory', 'Azure SQL', 'Power BI', 'Azure Synapse', 'dbt', 'Python'],
        en: {
            title: 'Data Analytics & Business Intelligence',
            short: 'Data & BI',
            summary: 'Reliable data pipelines and decision-ready dashboards that turn fragmented operational data into a shared source of truth.',
            overview: [
                'The usual symptom is a meeting where two departments present different numbers for the same month and the discussion becomes about whose report is right. That is not a dashboard problem — it is a definitions and pipeline problem, and no amount of visualization fixes it.',
                'We start by agreeing what each metric means and where it comes from, then build the pipelines that produce it consistently. Dashboards come last, on top of data that has already been reconciled, so the number on the screen is one your finance team will stand behind.',
            ],
            outcomes: [
                'One agreed definition per metric, documented and applied across reports',
                'Reporting that refreshes automatically instead of consuming days each month',
                'Data quality issues flagged at ingestion rather than discovered in a board pack',
                'Dashboards built around the decisions being made, not around available charts',
            ],
            deliverables: [
                { t: 'Data Pipelines', d: 'Automated ingestion from your operational systems with scheduling, transformation, and failure alerting on every run.' },
                { t: 'Executive Dashboards', d: 'Power BI reporting designed around the decisions leadership actually makes, with drill-down to the underlying records.' },
                { t: 'Reporting Automation', d: 'Scheduled distribution of recurring reports, replacing the manual export-and-format cycle at period end.' },
                { t: 'Data Quality Models', d: 'Validation rules, reconciliation checks, and a documented metric dictionary that keeps definitions stable over time.' },
            ],
            process: [
                { t: 'Define the metrics', d: 'We work with the people who use the numbers to agree definitions, sources, and ownership before any pipeline is built.' },
                { t: 'Build the pipeline', d: 'Ingestion, transformation, and validation run on a schedule, with alerting when a source fails or a value falls outside expected bounds.' },
                { t: 'Model & visualize', d: 'A shared data model feeds dashboards designed around specific decisions, with drill-through to the source records.' },
                { t: 'Reconcile & hand over', d: 'Output is reconciled against your existing reports for a full period, then handed over with documentation and training.' },
            ],
            faqs: [
                { q: 'Our data is spread across systems and spreadsheets. Is that a blocker?', a: 'No, it is the normal starting point. Spreadsheets can be ingested as sources like any other system. The work is agreeing which one is authoritative when they disagree, which is a business decision we facilitate rather than make for you.' },
                { q: 'Do we need a data warehouse?', a: 'Not always. For moderate volumes a well-structured Azure SQL database is sufficient and far cheaper to operate. We recommend a warehouse only when volume, source count, or history genuinely require one.' },
                { q: 'Can you work with Power BI licences we already have?', a: 'Yes. We build on your existing Microsoft licensing wherever possible and will tell you when a capacity or licence upgrade is genuinely required rather than assumed.' },
            ],
            meta: {
                title: 'Data Analytics & Business Intelligence Consulting in Qatar',
                description: 'Azure data pipelines, Power BI dashboards, reporting automation, and data quality models. One agreed source of truth for organizations in Qatar.',
            },
        },
        ar: {
            title: 'تحليلات البيانات وذكاء الأعمال',
            short: 'البيانات',
            summary: 'خطوط بيانات موثوقة ولوحات قرار تحوّل البيانات التشغيلية المتفرقة إلى مصدر موحد للحقيقة.',
            overview: [
                'العرض المعتاد للمشكلة اجتماع تعرض فيه إدارتان رقمين مختلفين عن الشهر نفسه، فيتحول النقاش إلى تحديد أي التقريرين صحيح. وهذه ليست مشكلة لوحات معلومات بل مشكلة تعريفات وخطوط بيانات، ولا يعالجها أي قدر من التصوير البياني.',
                'نبدأ بالاتفاق على معنى كل مؤشر ومصدره، ثم نبني الخطوط التي تنتجه باتساق. وتأتي اللوحات أخيراً فوق بيانات جرت تسويتها مسبقاً، ليكون الرقم المعروض على الشاشة رقماً يقف خلفه فريقكم المالي.',
            ],
            outcomes: [
                'تعريف واحد متفق عليه لكل مؤشر، موثّق ومطبَّق عبر التقارير',
                'تقارير تتحدث آلياً بدل أن تستهلك أياماً كل شهر',
                'رصد مشكلات جودة البيانات عند الإدخال لا اكتشافها في تقرير مجلس الإدارة',
                'لوحات مبنية حول القرارات المتخذة لا حول الرسوم البيانية المتاحة',
            ],
            deliverables: [
                { t: 'خطوط البيانات', d: 'استيعاب آلي من أنظمتكم التشغيلية مع الجدولة والتحويل والتنبيه عند فشل أي تشغيل.' },
                { t: 'لوحات الإدارة', d: 'تقارير Power BI مصممة حول القرارات التي تتخذها القيادة فعلاً، مع إمكانية النزول إلى السجلات الأساسية.' },
                { t: 'أتمتة التقارير', d: 'توزيع مجدول للتقارير الدورية بدل دورة التصدير والتنسيق اليدوية في نهاية كل فترة.' },
                { t: 'نماذج جودة البيانات', d: 'قواعد تحقق وفحوص تسوية وقاموس مؤشرات موثّق يحافظ على استقرار التعريفات مع الوقت.' },
            ],
            process: [
                { t: 'تعريف المؤشرات', d: 'نعمل مع مستخدمي الأرقام للاتفاق على التعريفات والمصادر والمسؤوليات قبل بناء أي خط بيانات.' },
                { t: 'بناء الخط', d: 'يعمل الاستيعاب والتحويل والتحقق وفق جدول، مع تنبيه عند فشل مصدر أو خروج قيمة عن الحدود المتوقعة.' },
                { t: 'النمذجة والعرض', d: 'نموذج بيانات موحد يغذي لوحات مصممة حول قرارات محددة، مع النفاذ إلى السجلات المصدرية.' },
                { t: 'التسوية والتسليم', d: 'تُسوّى المخرجات مقابل تقاريركم الحالية على مدى فترة كاملة، ثم تُسلَّم مع التوثيق والتدريب.' },
            ],
            faqs: [
                { q: 'بياناتنا موزعة بين أنظمة وجداول بيانات، هل هذا عائق؟', a: 'لا، بل هي نقطة البداية المعتادة. يمكن استيعاب جداول البيانات كمصادر مثل أي نظام آخر. والعمل الحقيقي هو الاتفاق على المصدر المرجعي عند الاختلاف، وهو قرار إداري نيسّره لكم ولا نتخذه عنكم.' },
                { q: 'هل نحتاج مستودع بيانات؟', a: 'ليس دائماً. تكفي قاعدة بيانات Azure SQL جيدة البنية للأحجام المتوسطة وبتكلفة تشغيل أقل بكثير. ولا نوصي بمستودع إلا حين يستدعيه الحجم أو عدد المصادر أو عمق السجل التاريخي فعلاً.' },
                { q: 'هل يمكنكم العمل بتراخيص Power BI التي نملكها؟', a: 'نعم. نبني على تراخيص Microsoft الحالية لديكم كلما أمكن، ونخبركم حين تكون ترقية السعة أو الترخيص ضرورة فعلية لا افتراضاً.' },
            ],
            meta: {
                title: 'استشارات تحليلات البيانات وذكاء الأعمال في قطر',
                description: 'خطوط بيانات Azure ولوحات Power BI وأتمتة التقارير ونماذج جودة البيانات. مصدر واحد متفق عليه للحقيقة للمؤسسات في قطر.',
            },
        },
    },

    'applied-ai-solutions': {
        id: 'ai',
        cat: 'intelligence',
        stack: ['Laravel / Svelte', 'Azure OpenAI', 'Azure AI Search', 'Document Intelligence', 'Python', 'Evaluation Harnesses'],
        en: {
            title: 'AI-Powered Software & Solutions',
            short: 'AI Solutions',
            summary: 'Useful AI inside your applications — from grounded assistants and intelligent search to document processing, with evaluation and human controls built in.',
            overview: [
                'AI should improve a specific task, not become a feature added for its own sake. We identify where intelligent search, assisted drafting, classification, or document processing can help your users, then build those capabilities into the software they already use or a new application designed around the workflow.',
                'Our existing retrieval and document intelligence work remains part of this service. Knowledge assistants use approved sources and show citations; document extraction includes confidence scoring and review. We integrate authentication, access controls, monitoring, and human approval where actions carry consequences, and evaluate quality before release.',
            ],
            outcomes: [
                'AI features integrated into a working product rather than a separate demo',
                'Bilingual assistants and search grounded in approved business sources',
                'Access controls and data handling designed around your governance requirements',
                'Measured quality with review and fallback paths when the model is uncertain',
            ],
            deliverables: [
                { t: 'AI-Powered Application Features', d: 'Assistants, intelligent search, assisted drafting, and classification integrated with your application, permissions, and existing APIs.' },
                { t: 'Bilingual Retrieval & RAG', d: 'Arabic and English knowledge assistants over approved documents, with source citations and permission-aware retrieval.' },
                { t: 'Document Intelligence', d: 'Structured extraction from contracts, invoices, and forms, with confidence scoring and human review for uncertain results.' },
                { t: 'Evaluation & Guardrails', d: 'Task-specific test sets, output checks, usage monitoring, and human approval for sensitive actions.' },
            ],
            process: [
                { t: 'Choose the task', d: 'Define the user workflow, authoritative data, acceptable errors, and a measurable success criterion before choosing a model.' },
                { t: 'Build & integrate', d: 'Implement the interface, retrieval or processing pipeline, permissions, and application integrations around the chosen task.' },
                { t: 'Evaluate', d: 'Test with representative Arabic and English cases and report quality, latency, cost, and known limitations.' },
                { t: 'Release & improve', d: 'Deploy with monitoring, review paths, and feedback that informs subsequent releases.' },
            ],
            faqs: [
                { q: 'Can you add AI to software we already have?', a: 'Yes. We review the existing application and APIs, then add focused capabilities without assuming the whole product needs to be rebuilt.' },
                { q: 'Does this include RAG and document intelligence?', a: 'Yes. These are part of the same AI service, not separate overlapping engagements. We choose retrieval, extraction, or other model capabilities according to the task.' },
                { q: 'Can AI results be guaranteed correct?', a: 'No. We evaluate against your own test cases, make limitations visible, and use citations, deterministic checks, and human review where needed. Arabic is tested as a first-class case.' },
            ],
            meta: {
                title: 'AI-Powered Software, RAG & Application Integration in Qatar',
                description: 'AI-powered application features, bilingual assistants, intelligent search, and document processing for organizations in Qatar. Evaluated and integrated with your workflows.',
            },
        },
        ar: {
            title: 'برمجيات وحلول مدعومة بالذكاء الاصطناعي',
            short: 'حلول الذكاء الاصطناعي',
            summary: 'ذكاء اصطناعي مفيد داخل تطبيقاتكم، من المساعدين والبحث الذكي إلى معالجة المستندات، مع تقييم الجودة وضوابط المراجعة البشرية.',
            overview: [
                'ينبغي أن يحسن الذكاء الاصطناعي مهمة محددة، لا أن يكون إضافة لمجرد مواكبة الاتجاه. نحدد كيف يمكن للبحث الذكي أو المساعدة في الصياغة أو التصنيف أو معالجة المستندات أن تخدم المستخدمين، ثم ندمجها في برامجهم الحالية أو تطبيق جديد مبني حول سير العمل.',
                'تبقى خدمات الاسترجاع وذكاء المستندات جزءاً من هذه الخدمة. يستند المساعدون إلى مصادر معتمدة ويعرضون المراجع، ويتضمن استخراج المستندات درجات ثقة ومراجعة. ندمج المصادقة والصلاحيات والمراقبة والموافقة البشرية على الإجراءات الحساسة، ونقيّم الجودة قبل الإطلاق.',
            ],
            outcomes: [
                'ميزات ذكاء اصطناعي داخل منتج عامل لا عرض توضيحي منفصل',
                'مساعدون وبحث ثنائي اللغة يستندان إلى مصادر أعمال معتمدة',
                'صلاحيات ومعالجة بيانات مصممة وفق متطلبات الحوكمة',
                'جودة مقيسة ومسارات مراجعة وبدائل عند عدم يقين النموذج',
            ],
            deliverables: [
                { t: 'ميزات تطبيقات مدعومة بالذكاء الاصطناعي', d: 'مساعدون وبحث ذكي ومساعدة في الصياغة وتصنيف، مدمجة مع التطبيق والصلاحيات والواجهات البرمجية الحالية.' },
                { t: 'الاسترجاع وRAG ثنائي اللغة', d: 'مساعدون بالعربية والإنجليزية يعملون على مستندات معتمدة، مع عرض المراجع واسترجاع يراعي صلاحيات المستخدم.' },
                { t: 'ذكاء المستندات', d: 'استخراج منظم من العقود والفواتير والنماذج مع درجات ثقة ومراجعة بشرية للنتائج غير المؤكدة.' },
                { t: 'التقييم وضوابط الأمان', d: 'مجموعات اختبار خاصة بالمهمة وفحوص للمخرجات ومراقبة الاستخدام وموافقة بشرية على الإجراءات الحساسة.' },
            ],
            process: [
                { t: 'اختيار المهمة', d: 'نحدد سير العمل والبيانات المرجعية والأخطاء المقبولة ومعيار نجاح قابل للقياس قبل اختيار النموذج.' },
                { t: 'البناء والتكامل', d: 'ننفذ الواجهة وخط الاسترجاع أو المعالجة والصلاحيات والتكاملات حول المهمة المختارة.' },
                { t: 'التقييم', d: 'نختبر حالات ممثلة بالعربية والإنجليزية ونوضح الجودة والسرعة والتكلفة والقيود المعروفة.' },
                { t: 'الإطلاق والتحسين', d: 'ننشر مع المراقبة ومسارات المراجعة والتغذية الراجعة التي توجه الإصدارات التالية.' },
            ],
            faqs: [
                { q: 'هل يمكن إضافة الذكاء الاصطناعي إلى برامجنا الحالية؟', a: 'نعم. نراجع التطبيق والواجهات الحالية ثم نضيف قدرات محددة دون افتراض الحاجة إلى إعادة بناء المنتج بالكامل.' },
                { q: 'هل تشمل الخدمة RAG وذكاء المستندات؟', a: 'نعم. هما جزء من خدمة الذكاء الاصطناعي نفسها لا خدمات متداخلة منفصلة. نختار الاسترجاع أو الاستخراج أو غيرهما حسب المهمة.' },
                { q: 'هل يمكن ضمان صحة نتائج الذكاء الاصطناعي؟', a: 'لا. نقيّم حالات الاختبار الخاصة بكم ونوضح القيود، ونستخدم المراجع والفحوص الحتمية والمراجعة البشرية عند الحاجة. ونختبر العربية كحالة أساسية.' },
            ],
            meta: {
                title: 'برمجيات الذكاء الاصطناعي وRAG وتكامل التطبيقات في قطر',
                description: 'ميزات تطبيقات مدعومة بالذكاء الاصطناعي ومساعدون ثنائيو اللغة وبحث ذكي ومعالجة مستندات للمؤسسات في قطر، مقيمة ومتكاملة مع سير العمل.',
            },
        },
    },

    'performance-optimization': {
        id: 'optimization',
        inquiryValue: 'optimize',
        cat: 'engineering',
        stack: ['Application Insights', 'PostgreSQL / SQL Server', 'Redis', 'Profilers', 'Load Testing', 'Azure Advisor'],
        en: {
            title: 'Maintenance & Performance Optimization',
            short: 'Performance',
            summary: 'Targeted modernization for systems held back by slow APIs, fragile code, database bottlenecks, or rising infrastructure cost.',
            overview: [
                'A system that has been in production for a few years usually does not need replacing. It needs the three or four specific bottlenecks removed that make it feel like it does. The trap is rewriting from scratch, which discards years of encoded business rules and typically costs several times the estimate.',
                'We start by measuring rather than guessing. Profiling and query analysis identify where time and money are genuinely going, then we fix those points in ranked order — with tests around each change so the system stays shippable throughout instead of entering a six-month rewrite.',
            ],
            outcomes: [
                'Response times reduced at the specific endpoints users actually feel',
                'Azure spend reduced by removing waste rather than by cutting capacity',
                'Test coverage added around the fragile areas that block confident releases',
                'A prioritized technical debt register with cost and risk stated per item',
            ],
            deliverables: [
                { t: 'Legacy Refactoring', d: 'Targeted restructuring of the highest-risk modules, with characterization tests written before any behaviour is changed.' },
                { t: 'API Optimization', d: 'Profiling, caching strategy, payload reduction, and removal of N+1 query patterns at the endpoints under real load.' },
                { t: 'Database Tuning', d: 'Query plan analysis, indexing strategy, schema corrections, and connection pooling based on your actual traffic profile.' },
                { t: 'Technical Audits', d: 'A written assessment of architecture, security posture, dependency risk, and infrastructure cost, with a ranked remediation plan.' },
            ],
            process: [
                { t: 'Measure', d: 'Profiling, query analysis, and cost review establish where time and spend actually go, replacing assumptions with numbers.' },
                { t: 'Rank', d: 'Findings are ordered by user impact and cost against effort, so the first fixes are the ones people notice.' },
                { t: 'Fix safely', d: 'Each change is covered by tests first, released incrementally, and verified against the baseline measurement.' },
                { t: 'Report', d: 'You receive before-and-after numbers plus a maintained debt register for the items deliberately deferred.' },
            ],
            faqs: [
                { q: 'Should we just rewrite the system instead?', a: 'Rarely. A rewrite discards years of business rules encoded in the existing code, and the second system usually takes far longer than estimated. We will say so directly if a rewrite genuinely is the right call, but the honest answer is normally targeted remediation.' },
                { q: 'Can you work on a system your team did not build?', a: 'Yes, and that is most of this work. We begin with an audit to build an accurate picture before changing anything, and we write tests around behaviour we are about to touch.' },
                { q: 'How much Azure cost can realistically be saved?', a: 'It depends on how the environment was provisioned. Common wins are right-sizing over-provisioned resources, reserved instances for steady workloads, and removing orphaned resources. The audit quantifies the saving for your specific estate before you commit to the work.' },
            ],
            meta: {
                title: 'Application Performance Optimization & Legacy Modernization in Qatar',
                description: 'API profiling, database tuning, legacy refactoring, and Azure cost reduction. Measured improvements to systems already in production.',
            },
        },
        ar: {
            title: 'الصيانة وتحسين الأداء',
            short: 'الأداء',
            summary: 'تحديث موجه للأنظمة المتأثرة ببطء الواجهات أو هشاشة الشفرة أو اختناقات قواعد البيانات أو ارتفاع تكلفة البنية.',
            overview: [
                'النظام الذي أمضى بضع سنوات في الإنتاج لا يحتاج غالباً إلى استبدال، بل إلى إزالة ثلاثة أو أربعة اختناقات محددة هي التي تجعله يبدو كذلك. والفخ هو إعادة الكتابة من الصفر، إذ تُهدر سنوات من قواعد العمل المضمّنة وتكلف عادةً أضعاف التقدير.',
                'نبدأ بالقياس لا بالتخمين. يحدد تحليل الأداء والاستعلامات أين يذهب الوقت والمال فعلاً، ثم نعالج تلك النقاط بترتيب الأولوية، مع اختبارات حول كل تغيير ليبقى النظام قابلاً للإصدار طوال الوقت بدل الدخول في إعادة كتابة تمتد ستة أشهر.',
            ],
            outcomes: [
                'تقليل أزمنة الاستجابة عند نقاط النهاية التي يشعر بها المستخدمون فعلاً',
                'خفض إنفاق Azure بإزالة الهدر لا بتقليص السعة',
                'إضافة تغطية اختبارية حول المناطق الهشة التي تعيق الإصدار بثقة',
                'سجل ديون تقنية مرتب الأولويات مع بيان الكلفة والمخاطر لكل بند',
            ],
            deliverables: [
                { t: 'تحديث الأنظمة القديمة', d: 'إعادة هيكلة موجهة للوحدات الأعلى مخاطرة، مع كتابة اختبارات توصيفية قبل تغيير أي سلوك.' },
                { t: 'تحسين API', d: 'تحليل أداء واستراتيجية تخزين مؤقت وتقليص حجم الاستجابات وإزالة أنماط استعلام N+1 عند نقاط النهاية تحت الحِمل الحقيقي.' },
                { t: 'ضبط قواعد البيانات', d: 'تحليل خطط الاستعلام واستراتيجية الفهرسة وتصحيح المخطط وتجميع الاتصالات بناءً على ملف حركتكم الفعلي.' },
                { t: 'التدقيق التقني', d: 'تقييم مكتوب للمعمارية والوضع الأمني ومخاطر الاعتماديات وتكلفة البنية، مع خطة معالجة مرتبة.' },
            ],
            process: [
                { t: 'القياس', d: 'يحدد تحليل الأداء والاستعلامات ومراجعة التكلفة أين يذهب الوقت والإنفاق فعلاً، فتحل الأرقام محل الافتراضات.' },
                { t: 'الترتيب', d: 'تُرتَّب النتائج حسب الأثر على المستخدم والتكلفة مقابل الجهد، لتكون الإصلاحات الأولى هي التي يلاحظها الناس.' },
                { t: 'الإصلاح الآمن', d: 'يُغطى كل تغيير باختبارات أولاً ويُصدر تدريجياً ويُتحقق منه مقابل القياس المرجعي.' },
                { t: 'التقرير', d: 'تحصلون على أرقام ما قبل وما بعد إضافة إلى سجل ديون محدَّث للبنود المؤجلة عمداً.' },
            ],
            faqs: [
                { q: 'أليس من الأفضل إعادة كتابة النظام؟', a: 'نادراً. تُهدر إعادة الكتابة سنوات من قواعد العمل المضمّنة في الشفرة القائمة، ويستغرق النظام الثاني عادةً وقتاً أطول بكثير من التقدير. وسنصرّح مباشرة إن كانت إعادة الكتابة هي القرار الصحيح فعلاً، لكن الإجابة الصادقة عادةً هي المعالجة الموجهة.' },
                { q: 'هل يمكنكم العمل على نظام لم يبنه فريقكم؟', a: 'نعم، وهو غالب هذا النوع من العمل. نبدأ بتدقيق لتكوين صورة دقيقة قبل تغيير أي شيء، ونكتب اختبارات حول السلوك الذي نوشك على المساس به.' },
                { q: 'كم يمكن توفيره واقعياً من تكلفة Azure؟', a: 'يعتمد على طريقة تجهيز البيئة. المكاسب الشائعة هي تصحيح حجم الموارد المفرطة والحجوزات للأحمال الثابتة وإزالة الموارد المهملة. ويقيس التدقيق حجم التوفير لبيئتكم تحديداً قبل الالتزام بالعمل.' },
            ],
            meta: {
                title: 'تحسين أداء التطبيقات وتحديث الأنظمة القديمة في قطر',
                description: 'تحليل أداء الواجهات البرمجية وضبط قواعد البيانات وتحديث الشفرة القديمة وخفض تكلفة Azure. تحسينات مقيسة لأنظمة قيد الإنتاج.',
            },
        },
    },

    'ecommerce-development': {
        id: 'ecommerce',
        cat: 'engineering',
        stack: ['Shopify / WooCommerce / Custom', 'Payment Gateways', 'Inventory Integrations', 'Analytics', 'Laravel / Svelte'],
        en: {
            title: 'E-commerce Development',
            short: 'E-commerce',
            summary: 'Online stores with clear product discovery, reliable checkout, and connected order operations — built around how your business sells.',
            overview: [
                'A store needs more than an attractive product grid. Customers must find the right item, understand delivery and pricing, and complete payment without friction. Your team must then fulfill that order without moving data between spreadsheets. We design the storefront and the operational flow together.',
                'We choose an established commerce platform when it fits, and custom development when your catalog, pricing, or integrations genuinely require it. This service focuses on selling online: products, checkout, orders, and fulfillment, rather than general-purpose business software.',
            ],
            outcomes: [
                'A responsive storefront that makes products easy to find and compare',
                'Checkout tested against the chosen payment provider and delivery rules',
                'Orders and inventory connected to your operational tools',
                'A store your team can manage with documented processes',
            ],
            deliverables: [
                { t: 'Storefront & Product Catalog', d: 'Responsive product and collection pages, search, variants, and catalog management tailored to your range.' },
                { t: 'Checkout & Payments', d: 'Payment-provider integration, clear checkout states, and testing for successful, failed, and interrupted transactions.' },
                { t: 'Orders & Fulfillment', d: 'Order workflows, shipping rules, and inventory or ERP integrations scoped to how your team fulfills purchases.' },
                { t: 'Launch & Measurement', d: 'Commerce analytics, consent-aware tracking, administrator training, and a tested launch checklist.' },
            ],
            process: [
                { t: 'Plan the store', d: 'Map the catalog, selling regions, payment requirements, fulfillment rules, and platform constraints.' },
                { t: 'Design the journey', d: 'Prototype product discovery, product pages, cart, and checkout for mobile and desktop shoppers.' },
                { t: 'Build & connect', d: 'Implement the storefront and connect payments, shipping, inventory, and analytics.' },
                { t: 'Test & launch', d: 'Validate complete order journeys and operational handover before opening the store to customers.' },
            ],
            faqs: [
                { q: 'Do we need a custom store?', a: 'Not necessarily. An established platform is usually the better starting point. We recommend custom engineering only when the requirements justify its additional ownership and maintenance.' },
                { q: 'Can the store support Arabic and English?', a: 'Yes. We scope bilingual content and RTL layouts from the outset, including product discovery and checkout where the selected platform supports them.' },
                { q: 'Can you migrate an existing store?', a: 'Yes. We review products, customer data, order history, URLs, and integrations, then agree a migration and redirect plan with validation before cutover.' },
            ],
            meta: {
                title: 'E-commerce Website & Online Store Development in Qatar',
                description: 'Responsive online stores, product catalogs, payment integrations, and connected order operations for businesses in Qatar. Platform-led or custom development.',
            },
        },
        ar: {
            title: 'تطوير المتاجر الإلكترونية',
            short: 'المتاجر الإلكترونية',
            summary: 'متاجر إلكترونية باكتشاف واضح للمنتجات ودفع موثوق وإدارة طلبات مترابطة، مبنية حول طريقة بيع نشاطكم.',
            overview: [
                'يحتاج المتجر إلى أكثر من عرض جذاب للمنتجات. يجب أن يجد العميل المنتج المناسب ويفهم التوصيل والأسعار ويتم الدفع بسهولة، ثم يتمكن فريقكم من تنفيذ الطلب دون نقل البيانات بين الجداول. نصمم واجهة المتجر وسير العمل التشغيلي معاً.',
                'نختار منصة تجارة جاهزة عندما تناسب المتطلبات، وتطويراً مخصصاً عندما يبرر الكتالوج أو التسعير أو التكامل ذلك. تركز هذه الخدمة على البيع الإلكتروني: المنتجات والدفع والطلبات والتنفيذ، لا أنظمة الأعمال العامة.',
            ],
            outcomes: [
                'واجهة متجاوبة تسهّل اكتشاف المنتجات ومقارنتها',
                'مسار دفع مختبر وفق مزوّد الدفع وقواعد التوصيل',
                'ربط الطلبات والمخزون بالأدوات التشغيلية',
                'متجر يستطيع فريقكم إدارته بإجراءات موثقة',
            ],
            deliverables: [
                { t: 'واجهة المتجر وكتالوج المنتجات', d: 'صفحات منتجات ومجموعات متجاوبة وبحث وخيارات منتجات وإدارة كتالوج مناسبة لتشكيلتكم.' },
                { t: 'إتمام الطلب والدفع', d: 'تكامل مزوّد الدفع وحالات واضحة للدفع واختبارات للعمليات الناجحة والفاشلة والمتوقفة.' },
                { t: 'الطلبات والتنفيذ', d: 'سير عمل للطلبات وقواعد شحن وتكامل مخزون أو ERP وفق طريقة تنفيذ فريقكم للمشتريات.' },
                { t: 'الإطلاق والقياس', d: 'تحليلات تجارة وتتبع يراعي الموافقة وتدريب المسؤولين وقائمة إطلاق مختبرة.' },
            ],
            process: [
                { t: 'تخطيط المتجر', d: 'نحدد الكتالوج ومناطق البيع ومتطلبات الدفع وقواعد التنفيذ وقيود المنصة.' },
                { t: 'تصميم الرحلة', d: 'نختبر اكتشاف المنتجات وصفحاتها والسلة والدفع على الهاتف والحاسوب.' },
                { t: 'البناء والربط', d: 'ننفذ الواجهة ونربط الدفع والشحن والمخزون والتحليلات.' },
                { t: 'الاختبار والإطلاق', d: 'نتحقق من رحلات الطلب كاملة والتسليم التشغيلي قبل فتح المتجر للعملاء.' },
            ],
            faqs: [
                { q: 'هل نحتاج إلى متجر مخصص؟', a: 'ليس بالضرورة. المنصة الجاهزة غالباً نقطة البداية الأفضل. نوصي بالهندسة المخصصة فقط عندما تبرر المتطلبات مسؤولياتها الإضافية وصيانتها.' },
                { q: 'هل يدعم المتجر العربية والإنجليزية؟', a: 'نعم. نحدد المحتوى ثنائي اللغة وتخطيط RTL منذ البداية، بما في ذلك اكتشاف المنتجات والدفع حيث تدعمه المنصة المختارة.' },
                { q: 'هل يمكن ترحيل متجر قائم؟', a: 'نعم. نراجع المنتجات وبيانات العملاء وسجل الطلبات والروابط والتكاملات، ثم نتفق على خطة ترحيل وإعادة توجيه مع التحقق قبل التحويل.' },
            ],
            meta: {
                title: 'تطوير المتاجر الإلكترونية ومواقع التجارة في قطر',
                description: 'متاجر متجاوبة وكتالوجات منتجات وتكامل دفع وإدارة طلبات مترابطة للشركات في قطر، على منصات جاهزة أو بتطوير مخصص.',
            },
        },
    },

    'corporate-websites': {
        id: 'website',
        cat: 'engineering',
        stack: ['Laravel / Svelte', 'CMS', 'HTML & CSS', 'Accessibility', 'Analytics', 'Managed Hosting'],
        en: {
            title: 'Corporate Websites',
            short: 'Corporate Websites',
            summary: 'Fast, accessible company websites with clear content, bilingual experiences, and a CMS your team can confidently manage.',
            overview: [
                'Your company website should make it easy to understand what you do, why your organization is credible, and how to contact the right team. We turn that into a clear content structure and a responsive website, rather than a collection of decorative pages with no useful next step.',
                'This service delivers the public-facing website: service pages, company content, enquiries, and editing tools. It is separate from internal platforms and from brand strategy. We can work with your existing identity or coordinate with the design service when a new visual system is needed.',
            ],
            outcomes: [
                'A clear presentation of your company, services, and credibility',
                'A responsive Arabic and English experience where required',
                'Content your team can maintain without routine developer requests',
                'Accessible navigation and measurable enquiry journeys',
            ],
            deliverables: [
                { t: 'Content Structure & Page Design', d: 'Site architecture and responsive templates for company, service, industry, and contact content.' },
                { t: 'CMS & Editing Workflow', d: 'Content management with appropriate roles, reusable page sections, and editor training.' },
                { t: 'Bilingual & Accessible Build', d: 'Arabic/English layouts, semantic markup, keyboard navigation, and responsive implementation.' },
                { t: 'Enquiries & Launch Setup', d: 'Contact forms, analytics, technical search foundations, hosting setup, and a documented handover.' },
            ],
            process: [
                { t: 'Structure', d: 'Review audiences, company content, and the actions visitors need to take.' },
                { t: 'Design', d: 'Agree page templates, content hierarchy, and responsive bilingual layouts.' },
                { t: 'Build', d: 'Implement templates, the CMS, forms, and integrations, then populate approved content.' },
                { t: 'Launch & hand over', d: 'Check accessibility, performance, forms, and redirects, and train the team that will maintain the site.' },
            ],
            faqs: [
                { q: 'Can you use our current brand identity?', a: 'Yes. We can build within your existing guidelines. A separate brand engagement is only needed when the identity itself needs work.' },
                { q: 'Can our team edit the website?', a: 'Yes. We choose a CMS and editing workflow around your team, define permissions, and provide practical training and documentation.' },
                { q: 'Is ongoing SEO included?', a: 'The build includes technical search foundations such as page metadata, crawlable structure, and performance work. Ongoing content strategy and SEO/GEO measurement are scoped through the dedicated search service.' },
            ],
            meta: {
                title: 'Corporate & Bilingual Company Website Development in Qatar',
                description: 'Accessible, responsive company websites with Arabic and English layouts, CMS editing, enquiry forms, and clear content for organizations in Qatar.',
            },
        },
        ar: {
            title: 'مواقع الشركات والمؤسسات',
            short: 'مواقع الشركات',
            summary: 'مواقع شركات سريعة وسهلة الاستخدام، بمحتوى واضح وتجربة ثنائية اللغة ونظام إدارة محتوى يستطيع فريقكم إدارته بثقة.',
            overview: [
                'ينبغي أن يجعل موقع الشركة فهم نشاطكم ومصداقية مؤسستكم والتواصل مع الفريق المناسب أمراً سهلاً. نحول ذلك إلى هيكل محتوى واضح وموقع متجاوب، بدلاً من صفحات زخرفية دون خطوة تالية مفيدة.',
                'تسلم هذه الخدمة الموقع العام: صفحات الخدمات ومحتوى الشركة والاستفسارات وأدوات التحرير. وهي مختلفة عن المنصات الداخلية وعن استراتيجية الهوية. نعمل بهويتكم الحالية أو ننسق مع خدمة التصميم عند الحاجة إلى نظام بصري جديد.',
            ],
            outcomes: [
                'عرض واضح للشركة والخدمات وعناصر المصداقية',
                'تجربة متجاوبة بالعربية والإنجليزية عند الحاجة',
                'محتوى يديره فريقكم دون طلبات تطوير متكررة',
                'تنقل سهل الوصول ومسارات استفسار قابلة للقياس',
            ],
            deliverables: [
                { t: 'هيكل المحتوى وتصميم الصفحات', d: 'معمارية موقع وقوالب متجاوبة لمحتوى الشركة والخدمات والقطاعات والتواصل.' },
                { t: 'إدارة المحتوى وسير التحرير', d: 'نظام محتوى بصلاحيات مناسبة وأقسام قابلة لإعادة الاستخدام وتدريب للمحررين.' },
                { t: 'بناء ثنائي اللغة وسهل الوصول', d: 'تخطيطات عربية وإنجليزية وعناصر دلالية وتنقل بلوحة المفاتيح وتنفيذ متجاوب.' },
                { t: 'الاستفسارات وتهيئة الإطلاق', d: 'نماذج تواصل وتحليلات وأسس تقنية للبحث وإعداد استضافة وتسليم موثق.' },
            ],
            process: [
                { t: 'الهيكلة', d: 'نراجع الجمهور ومحتوى الشركة والإجراءات التي يحتاج الزوار إلى اتخاذها.' },
                { t: 'التصميم', d: 'نتفق على القوالب وتسلسل المحتوى وتخطيطات متجاوبة ثنائية اللغة.' },
                { t: 'البناء', d: 'ننفذ القوالب ونظام المحتوى والنماذج والتكاملات ونضيف المحتوى المعتمد.' },
                { t: 'الإطلاق والتسليم', d: 'نتحقق من سهولة الوصول والأداء والنماذج وإعادة التوجيه وندرب فريق إدارة الموقع.' },
            ],
            faqs: [
                { q: 'هل يمكن استخدام هويتنا الحالية؟', a: 'نعم. يمكن البناء وفق أدلتكم الحالية. نحتاج إلى مشروع هوية منفصل فقط عندما تتطلب الهوية نفسها تطويراً.' },
                { q: 'هل يستطيع فريقنا تحرير الموقع؟', a: 'نعم. نختار نظام محتوى وسير تحرير مناسبين لفريقكم ونحدد الصلاحيات ونقدم تدريباً وتوثيقاً عمليين.' },
                { q: 'هل تشمل الخدمة تحسين البحث المستمر؟', a: 'يشمل البناء الأسس التقنية مثل البيانات الوصفية وهيكل قابل للفهرسة وتحسين الأداء. أما استراتيجية المحتوى والقياس المستمر لـSEO وGEO فتحدد عبر خدمة البحث المتخصصة.' },
            ],
            meta: {
                title: 'تطوير مواقع الشركات والمؤسسات ثنائية اللغة في قطر',
                description: 'مواقع شركات متجاوبة وسهلة الوصول بتخطيطات عربية وإنجليزية ونظام محتوى ونماذج استفسار ومحتوى واضح للمؤسسات في قطر.',
            },
        },
    },

    'seo-and-geo': {
        id: 'seo',
        cat: 'growth',
        stack: ['Google Search Console', 'GA4', 'Structured Data', 'Technical Audits', 'Content Research', 'AI Search Monitoring'],
        en: {
            title: 'SEO & Generative Engine Optimization',
            short: 'SEO & GEO',
            summary: 'Clear, discoverable content for conventional search and AI-generated answers, supported by technical SEO and honest performance measurement.',
            overview: [
                'Search visibility starts with content that answers real questions and a site search engines can reliably crawl. We assess indexing, page structure, performance, content gaps, and how your business is represented online, then prioritize changes against the audience and enquiries you want to reach.',
                'Generative Engine Optimization extends that work to AI-generated search answers. We improve factual clarity, entity consistency, source quality, and structured content, and monitor representative queries where practical. No provider can guarantee rankings or an AI citation; the work is measured through observable search and business outcomes.',
            ],
            outcomes: [
                'A prioritized technical and content plan based on evidence',
                'Clearer pages that answer the questions your audience actually asks',
                'Consistent business information and structured data where appropriate',
                'Reporting that distinguishes traffic, enquiries, and sampled AI-search visibility',
            ],
            deliverables: [
                { t: 'Technical SEO Audit', d: 'Crawlability, indexing, metadata, internal links, mobile performance, and a ranked remediation plan.' },
                { t: 'Search & Content Strategy', d: 'Audience and query research, page mapping, content briefs, and on-page improvements with a defined review process.' },
                { t: 'GEO & Entity Clarity', d: 'Factually grounded pages, consistent business entities, useful answer structures, and appropriate schema without misleading claims.' },
                { t: 'Measurement & Reporting', d: 'Search Console and analytics setup or review, agreed conversion measures, and clearly scoped sampling of AI-answer visibility.' },
            ],
            process: [
                { t: 'Establish the baseline', d: 'Review the website, current search performance, target audience, and business goals.' },
                { t: 'Prioritize', d: 'Separate technical blockers from content opportunities and agree the highest-value work first.' },
                { t: 'Improve', d: 'Implement or coordinate site changes, content updates, structured data, and business-information consistency.' },
                { t: 'Measure & iterate', d: 'Review indexing, queries, qualified enquiries, and sampled AI answers, then adapt the plan to the evidence.' },
            ],
            faqs: [
                { q: 'What is GEO?', a: 'Generative Engine Optimization is the practice of making your information easier to discover, understand, and reference in AI-generated search answers. It complements SEO rather than replacing it.' },
                { q: 'Can you guarantee first-page rankings or AI citations?', a: 'No. Search engines and AI systems control their own outputs. We agree deliverables, publish evidence-based reporting, and avoid promises that no provider can reliably fulfill.' },
                { q: 'Does this include paid advertising?', a: 'No. This service focuses on organic search and AI-answer visibility. Paid campaigns can be scoped separately through the design and growth offering.' },
            ],
            meta: {
                title: 'SEO & Generative Engine Optimization (GEO) in Qatar',
                description: 'Technical SEO, content strategy, structured data, and generative search visibility for businesses in Qatar. Evidence-led work without ranking or citation guarantees.',
            },
        },
        ar: {
            title: 'تحسين محركات البحث والبحث التوليدي',
            short: 'SEO وGEO',
            summary: 'محتوى واضح وقابل للاكتشاف في البحث التقليدي وإجابات الذكاء الاصطناعي، مدعوم بتحسين تقني وقياس صادق للأداء.',
            overview: [
                'يبدأ الظهور بمحتوى يجيب عن أسئلة حقيقية وموقع تستطيع محركات البحث الزحف إليه بموثوقية. نقيّم الفهرسة وهيكل الصفحات والأداء وفجوات المحتوى وتمثيل نشاطكم على الإنترنت، ثم نرتب التغييرات وفق الجمهور والاستفسارات المستهدفة.',
                'يمد تحسين محركات البحث التوليدي هذا العمل إلى الإجابات المنتجة بالذكاء الاصطناعي. نحسن وضوح الحقائق واتساق معلومات النشاط وجودة المصادر وبنية المحتوى، ونراقب أسئلة ممثلة حيث يمكن ذلك. لا يمكن ضمان ترتيب أو استشهاد من نظام ذكاء اصطناعي؛ نقيس العمل بنتائج بحث وأعمال قابلة للرصد.',
            ],
            outcomes: [
                'خطة تقنية ومحتوى مرتبة الأولويات ومبنية على أدلة',
                'صفحات أوضح تجيب عن أسئلة الجمهور الفعلية',
                'معلومات نشاط متسقة وبيانات منظمة حيث تناسب',
                'تقارير تميز الزيارات والاستفسارات وعينات الظهور في البحث التوليدي',
            ],
            deliverables: [
                { t: 'تدقيق SEO التقني', d: 'الزحف والفهرسة والبيانات الوصفية والروابط الداخلية وأداء الهاتف وخطة معالجة مرتبة.' },
                { t: 'استراتيجية البحث والمحتوى', d: 'بحث الجمهور والاستفسارات وخريطة صفحات وموجزات محتوى وتحسينات داخل الصفحات مع مراجعة محددة.' },
                { t: 'GEO ووضوح معلومات النشاط', d: 'صفحات دقيقة ومعلومات نشاط متسقة وبنى إجابات مفيدة وبيانات منظمة مناسبة دون ادعاءات مضللة.' },
                { t: 'القياس والتقارير', d: 'تهيئة أو مراجعة Search Console والتحليلات ومقاييس تحويل متفق عليها وعينات محددة لظهور الإجابات التوليدية.' },
            ],
            process: [
                { t: 'تحديد خط الأساس', d: 'نراجع الموقع وأداء البحث الحالي والجمهور المستهدف وأهداف النشاط.' },
                { t: 'ترتيب الأولويات', d: 'نفصل العوائق التقنية عن فرص المحتوى ونتفق على العمل الأعلى قيمة أولاً.' },
                { t: 'التحسين', d: 'ننفذ أو ننسق تغييرات الموقع والمحتوى والبيانات المنظمة واتساق معلومات النشاط.' },
                { t: 'القياس والتطوير', d: 'نراجع الفهرسة والاستفسارات والعملاء المحتملين وعينات الإجابات التوليدية ونكيف الخطة وفق الأدلة.' },
            ],
            faqs: [
                { q: 'ما المقصود بـGEO؟', a: 'تحسين محركات البحث التوليدي هو جعل معلوماتكم أسهل للاكتشاف والفهم والاستشهاد في إجابات البحث المنتجة بالذكاء الاصطناعي. وهو مكمل لـSEO لا بديل عنه.' },
                { q: 'هل تضمنون الصفحة الأولى أو استشهاد الذكاء الاصطناعي؟', a: 'لا. تتحكم محركات البحث وأنظمة الذكاء الاصطناعي في مخرجاتها. نتفق على مخرجات العمل ونقدم تقارير مبنية على الأدلة ونتجنب وعوداً لا يمكن لأي مزوّد ضمانها.' },
                { q: 'هل تشمل الخدمة الإعلانات المدفوعة؟', a: 'لا. تركز هذه الخدمة على البحث العضوي وظهور الإجابات التوليدية. يمكن تحديد نطاق الحملات المدفوعة بشكل منفصل عبر خدمة التصميم والنمو.' },
            ],
            meta: {
                title: 'تحسين محركات البحث SEO والبحث التوليدي GEO في قطر',
                description: 'تحسين بحث تقني واستراتيجية محتوى وبيانات منظمة وظهور في البحث التوليدي للشركات في قطر، بعمل مبني على الأدلة دون ضمانات ترتيب أو استشهاد.',
            },
        },
    },

    'product-design-brand-growth': {
        id: 'creative',
        cat: 'growth',
        stack: ['Figma', 'Design Systems', 'Webflow / Custom', 'Analytics', 'SEO Tooling', 'Meta & Google Ads'],
        en: {
            title: 'Product Design, Brand & Digital Growth',
            short: 'Design & Brand',
            summary: 'Complementary product experience, identity, and growth support that helps technically strong solutions launch with equal clarity.',
            overview: [
                'A well-engineered system still fails if people cannot navigate it or do not trust how it looks. This capability exists because our engineering work kept running into the same gap at launch: the platform was sound, and the interface, identity, and go-to-market story were not ready to match it.',
                'We treat design as part of delivery rather than decoration applied at the end. That means a design system the developers can build against, an identity that works in Arabic and English at the same level of quality, and launch measurement that shows whether anyone actually arrived and converted.',
            ],
            outcomes: [
                'A reusable design system rather than one-off screens that drift over time',
                'Bilingual identity that holds up in Arabic and English equally',
                'Interfaces validated with users before engineering commits to them',
                'Launch performance measured against defined goals, not impressions',
            ],
            deliverables: [
                { t: 'UX/UI & Product Design', d: 'User flows, interface design, and a component-based design system that engineering can implement without reinterpretation.' },
                { t: 'Brand Identity', d: 'Logo, typography, colour, and application guidelines built to work bilingually in Arabic and English from the outset.' },
                { t: 'Launch Strategy & Measurement', d: 'Launch messaging, campaign creative, and conversion measurement coordinated with your website or store delivery.' },
                { t: 'Focused Digital Campaigns', d: 'Targeted search and social campaigns with defined goals, tracked conversions, and honest reporting on what performed.' },
            ],
            process: [
                { t: 'Understand', d: 'We review the audience, the competitive context, and the decision the user is being asked to make.' },
                { t: 'Design', d: 'Flows and interfaces are designed as an interactive prototype and tested before engineering effort is committed.' },
                { t: 'Systematize', d: 'Patterns become a documented component library so the product stays consistent as it grows.' },
                { t: 'Launch & measure', d: 'Go-live with analytics and conversion tracking in place, followed by a review of what the numbers actually show.' },
            ],
            faqs: [
                { q: 'Can we engage design without engineering?', a: 'Yes. Design, identity, and growth can be engaged on their own. The handover pack is built so any competent development team can implement it, not only ours.' },
                { q: 'Do you design for Arabic properly?', a: 'Yes. Arabic is designed as a first-class layout with proper right-to-left structure and Arabic typography, rather than a mirrored version of the English screens with a translated font dropped in.' },
                { q: 'Do you run campaigns on an ongoing basis?', a: 'We focus on launch and early growth: setting up tracking, running the initial campaigns, and proving what converts. For long-run always-on media buying, an agency retainer is usually the better fit and we will say so.' },
            ],
            meta: {
                title: 'Product Design, Brand Identity & Digital Growth in Qatar',
                description: 'UX/UI design systems, bilingual Arabic and English brand identity, launch sites, and measured digital campaigns for technology products in Qatar.',
            },
        },
        ar: {
            title: 'تصميم المنتج والهوية والنمو الرقمي',
            short: 'التصميم والهوية',
            summary: 'خدمات مكملة في تجربة المنتج والهوية والنمو تساعد الحلول التقنية القوية على الانطلاق بوضوح مماثل.',
            overview: [
                'يظل النظام المُهندَس جيداً عرضة للفشل إذا لم يستطع الناس التنقل فيه أو لم يثقوا بمظهره. وُجدت هذه القدرة لأن أعمالنا الهندسية ظلت تصطدم بالفجوة نفسها عند الإطلاق: المنصة متينة، بينما الواجهة والهوية وقصة الدخول إلى السوق غير جاهزة لمجاراتها.',
                'نتعامل مع التصميم كجزء من التنفيذ لا كزينة تُضاف في النهاية. أي نظام تصميم يستطيع المطورون البناء عليه، وهوية تعمل بالعربية والإنجليزية بالمستوى نفسه من الجودة، وقياس إطلاق يوضح إن كان أحد قد وصل فعلاً وتحوّل.',
            ],
            outcomes: [
                'نظام تصميم قابل لإعادة الاستخدام بدل شاشات منفصلة تتباعد مع الوقت',
                'هوية ثنائية اللغة تصمد بالعربية والإنجليزية بالقدر نفسه',
                'واجهات مُختبرة مع المستخدمين قبل التزام الهندسة بها',
                'أداء إطلاق مقيس مقابل أهداف محددة لا مقابل الانطباعات',
            ],
            deliverables: [
                { t: 'تصميم UX/UI والمنتج', d: 'مسارات المستخدم وتصميم الواجهات ونظام تصميم قائم على المكونات يستطيع فريق الهندسة تنفيذه دون إعادة تأويل.' },
                { t: 'الهوية التجارية', d: 'الشعار والخطوط والألوان وأدلة التطبيق، مبنية لتعمل ثنائية اللغة بالعربية والإنجليزية منذ البداية.' },
                { t: 'استراتيجية الإطلاق والقياس', d: 'رسائل إطلاق ومحتوى حملات وقياس تحويلات بالتنسيق مع تنفيذ موقعكم أو متجركم.' },
                { t: 'حملات رقمية مركزة', d: 'حملات بحث وتواصل اجتماعي موجهة بأهداف محددة وتحويلات متتبعة وتقارير صادقة عما حقق نتيجة فعلاً.' },
            ],
            process: [
                { t: 'الفهم', d: 'نراجع الجمهور والسياق التنافسي والقرار المطلوب من المستخدم اتخاذه.' },
                { t: 'التصميم', d: 'تُصمَّم المسارات والواجهات كنموذج تفاعلي وتُختبر قبل تخصيص جهد هندسي لها.' },
                { t: 'المنهجة', d: 'تتحول الأنماط إلى مكتبة مكونات موثّقة ليبقى المنتج متسقاً مع نموه.' },
                { t: 'الإطلاق والقياس', d: 'انطلاق مع تحليلات وتتبع تحويلات جاهزين، تعقبه مراجعة لما تظهره الأرقام فعلاً.' },
            ],
            faqs: [
                { q: 'هل يمكننا التعاقد على التصميم دون الهندسة؟', a: 'نعم. يمكن التعاقد على التصميم والهوية والنمو بشكل مستقل. وتُبنى حزمة التسليم بحيث يستطيع أي فريق تطوير كفؤ تنفيذها لا فريقنا وحده.' },
                { q: 'هل تصممون للعربية بشكل صحيح؟', a: 'نعم. تُصمَّم العربية كتخطيط أساسي ببنية صحيحة من اليمين إلى اليسار وطباعة عربية ملائمة، لا كنسخة معكوسة من الشاشات الإنجليزية بخط مترجم.' },
                { q: 'هل تديرون الحملات بشكل مستمر؟', a: 'نركز على الإطلاق والنمو المبكر: تهيئة التتبع وتشغيل الحملات الأولى وإثبات ما يحقق تحويلاً. أما شراء الإعلانات المستمر طويل الأمد فالأنسب له عادةً وكالة متخصصة، وسنقول ذلك بصراحة.' },
            ],
            meta: {
                title: 'تصميم المنتجات والهوية التجارية والنمو الرقمي في قطر',
                description: 'أنظمة تصميم UX/UI وهوية تجارية ثنائية اللغة بالعربية والإنجليزية ومواقع إطلاق وحملات رقمية مقيسة للمنتجات التقنية في قطر.',
            },
        },
    },
}

/** Slug order as presented in the footer, home grid, and overview page. */
export const SERVICE_SLUGS = Object.keys(catalog)

/**
 * Locale-prefixed path to a service detail page.
 *
 * @param {string} slug
 * @param {'en' | 'ar'} locale
 */
export function serviceHref(slug, locale = 'en') {
    return locale === 'ar' ? `/ar/services/${slug}` : `/services/${slug}`
}

/**
 * Delivery categories in display order, flattened for a locale.
 *
 * @param {'en' | 'ar'} locale
 */
export function getCategories(locale = 'en') {
    return Object.entries(categories).map(([id, category]) => ({
        id,
        tone: category.tone,
        color: TONE_HEX[category.tone],
        ...(category[locale] ?? category.en),
    }))
}

/**
 * Resolve a single service for a locale, flattened for template consumption.
 * Category-derived fields and the feature list are computed here so no surface
 * has to know how they are assembled.
 *
 * @param {string} slug
 * @param {'en' | 'ar'} locale
 */
export function getService(slug, locale = 'en') {
    const entry = catalog[slug]
    if (!entry) return null

    const body = entry[locale] ?? entry.en
    const category = categories[entry.cat]
    const categoryBody = category[locale] ?? category.en

    return {
        slug,
        id: entry.id,
        inquiryValue: entry.inquiryValue ?? entry.id,
        cat: entry.cat,
        tone: category.tone,
        color: TONE_HEX[category.tone],
        stack: entry.stack,
        href: serviceHref(slug, locale),
        // The section eyebrow is the category name; the card tag is its short form.
        eyebrow: categoryBody.label,
        eyebrowShort: categoryBody.short,
        ...body,
        // Feature chips are the deliverable titles — one list, never out of step.
        features: body.deliverables.map((d) => d.t),
    }
}

/**
 * All services in catalog order — used by the footer, home grid, and
 * overview page.
 *
 * @param {'en' | 'ar'} locale
 */
export function getServices(locale = 'en') {
    return SERVICE_SLUGS.map((slug) => getService(slug, locale))
}

/**
 * Services grouped under their category, in category order.
 *
 * @param {'en' | 'ar'} locale
 */
export function getServiceGroups(locale = 'en') {
    const all = getServices(locale)

    return getCategories(locale).map((category) => ({
        ...category,
        items: all.filter((service) => service.cat === category.id),
    }))
}

/**
 * Sibling services, preferring ones in the same category.
 *
 * @param {string} slug
 * @param {'en' | 'ar'} locale
 * @param {number} limit
 */
export function getRelatedServices(slug, locale = 'en', limit = 3) {
    const current = catalog[slug]
    if (!current) return []

    const others = SERVICE_SLUGS.filter((s) => s !== slug)
    const sameCat = others.filter((s) => catalog[s].cat === current.cat)
    const rest = others.filter((s) => catalog[s].cat !== current.cat)

    return [...sameCat, ...rest].slice(0, limit).map((s) => getService(s, locale))
}
