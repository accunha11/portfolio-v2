export type Project = {
  title: string
  subtitle: string
  category: "Research" | "University Project"
  year: "2026" | "2025" | "2024"
  status?: "In progress"
  summary: string
  details: string
  skills: string[]
  githubUrl?: string
  paperUrl?: string
  blogSlug?: string
}

export const projects: Project[] = [
  {
    title: "Master–Novice Divergence for Reward Densification",
    subtitle:
      "Research with TUM School of Computation, Information and Technology",
    category: "Research",
    year: "2026",
    summary:
      "Tested whether a deliberately weakened copy of an LLM can point to the reasoning steps that decide the answer. Three interventions say it cannot.",
    details:
      "A Master/Novice framework for turning sparse pass-or-fail rewards into dense ones: weaken a Qwen3.5-4B model through tensor disentanglement of its MLP weights, then treat the tokens where the two versions disagree as the ones deserving credit. Rather than assume the signal and train on it, we reduced the idea to a single falsifiable claim and attacked it with three interventions on MATH-500, matching on rollout depth and adjusting for the model's own entropy. Disagreement positions carried no more influence over the final answer than matched controls, at McNemar p = 1.00 and Fisher p = 0.80. What they do mark, beyond entropy, is fragility of the next few tokens. The work delivers a quantified negative result alongside a pipeline that produces the same model at any capacity from one decomposition.",
    skills: [
      "Machine Learning & AI",
      "Model Evaluation",
      "Reasoning & Reliability",
      "Python",
    ],
    paperUrl: "/pdfs/Master-Novice Reward Densification.pdf",
    blogSlug: "where-an-llms-reasoning-matters-a-negative-result",
  },
  {
    title: "Unsupervised Prediction of TF Binding Sites",
    subtitle: "Group Project for Machine Learning for Regulatory Genomics",
    category: "University Project",
    year: "2026",
    summary:
      "Read transcription factor binding out of a DNA language model without labels, and showed a cross-modal model was genuinely using its protein input.",
    details:
      "An entry to the BindingBench challenge, which asks for methods that work beyond the sparse ChIP annotations available for most species and factors. A TopK sparse autoencoder trained on SpeciesLM embeddings, with no binding labels in the objective, reached a median best-feature AUROC of 0.659 across 164 held-out transcription factors under a gene-held-out split. A second model conditioned a DNA encoder on ESM-DBP protein embeddings through FiLM. Shuffling those protein embeddings halved average precision while leaving AUROC almost unchanged, which showed both that factor identity carried real signal and that the headline metric was nearly blind to it. Everything was measured against classical motif baselines: STREME, and JASPAR with FIMO.",
    skills: [
      "Machine Learning & AI",
      "Computational Biology",
      "Model Evaluation",
      "Python",
    ],
    paperUrl: "/pdfs/BindingBench Presentation.pdf",
    blogSlug: "sparse-autoencoders-on-a-genome-model",
  },
  {
    title: "Prompt Optimization in Medical LLM Benchmarks",
    subtitle:
      "Research with TUM School of Computation, Information and Technology",
    category: "Research",
    year: "2026",
    summary:
      "Showed that HealthBench rankings move with the prompt, and that swapping the judge model shifts scores far more than rewording the judge instruction.",
    details:
      "A HealthBench pipeline that keeps generation and scoring separate, used to compare five hand-written prompting strategies against Cost-Aware Prompt Optimization across several models. Safety-first prompts beat baseline everywhere and brevity-forcing prompts came last. More tellingly, prompts optimized separately per model from different seeds all converged on safety-first language, which suggests the search was finding rubric alignment rather than lucky wording. Relative model ranking changed across prompt configurations, and the choice of judge model degraded score agreement far more than the wording of the judge instruction. The conclusion is about method: open-ended medical benchmark numbers are conditional on prompt and evaluator, and belong in a paper with the robustness checks attached.",
    skills: [
      "LLM Systems",
      "Model Evaluation",
      "Reasoning & Reliability",
      "Python",
    ],
    paperUrl: "/pdfs/Prompt Optimization in Medical LLM Benchmarks.pdf",
    blogSlug: "a-healthbench-score-measures-three-things",
  },
  {
    title: "Oversmoothing in Deep Graph Neural Networks",
    subtitle:
      "Research with TUM School of Computation, Information and Technology",
    category: "Research",
    year: "2026",
    summary:
      "Traced representation collapse in deep GNNs to optimization rather than to message passing.",
    details:
      "Reproduced the Untrained GNN Tickets result across three architectures and three citation datasets, confirming that frozen-weight sparse subnetworks stay stable past 20 layers while trained dense models collapse within a few. Isolated the cause by running the configuration the literature leaves out, sparse networks that still train their weights, which collapse much like dense ones and rule sparsity out as the reason. Extended this with weight reparameterization, which holds up under training, against a control that applies the same correction only once at initialization and does not, placing the failure in the optimization trajectory rather than the starting point.",
    skills: ["Machine Learning & AI", "Model Evaluation", "Python"],
    githubUrl: "https://github.com/accunha11/practical-gnn",
    paperUrl: "/pdfs/Oversmoothing Report.pdf",
    blogSlug: "oversmoothing-is-a-training-dynamics-failure",
  },
  {
    title: "NL2SQL AI Agent for Manufacturing Data",
    subtitle: "Interdisciplinary Project with TUM's IWB department",
    category: "University Project",
    year: "2026",
    summary:
      "Built a staged natural-language interface to an industrial database, then benchmarked models inside the fixed harness to tell model quality apart from system design.",
    details:
      "An LLM-to-SQL system over a PostgreSQL tool condition monitoring database, built in Python with LangGraph, FastAPI and Next.js, and split into explicit stages: request classification, schema-aware table selection, SQL generation, validation, read-only execution with bounded retries, and answer summarization. Schema grounding narrowed prompts to real tables and relations, which suppressed invented columns and impossible joins, while validation and read-only transactions made safety a property of the system rather than a request in the prompt. Swapping models inside the same pipeline separated capability from orchestration: local models needed over 180 seconds per query and failed on more than 80 percent of them, while a stronger hosted model answered in about 45 seconds without errors.",
    skills: ["LLM Systems", "LangGraph", "Python", "SQL"],
    paperUrl: "/pdfs/NL2SQL Report.pdf",
    blogSlug: "guardrails-bound-the-damage-not-the-capability-gap",
  },
  {
    title: "AI Fashion Assistant with Virtual Try-On",
    subtitle: "Group Project for Generative AI Class",
    category: "University Project",
    year: "2026",
    summary:
      "Built a full-stack assistant that suggests outfits from a user's own wardrobe and renders them with virtual try-on.",
    details:
      "A generative AI application that recommends outfits from clothes the user already owns, then visualizes each look through virtual try-on.",
    skills: ["Machine Learning & AI"],
  },
  {
    title: "3D Face Reconstruction",
    subtitle: "Group Project for 3D Scanning and Motion Capture Class",
    category: "University Project",
    year: "2025",
    summary:
      "Recovered 3D facial geometry from a single photograph by fitting parametric face models, with every stage of the pipeline separately verified.",
    details:
      "Single-image 3D face reconstruction in Python, using the BFM and FLAME morphable models as generative priors and fitting identity and expression coefficients by analysis-by-synthesis. Pose was initialized in two steps, rotation from a Perspective-n-Point solve and then scale and translation under a weak perspective camera, which stabilized the non-convex fit that followed. The objective combined landmark reprojection error with L2 regularization scaled by the PCA variances, and stopped early: continuing past convergence made the solver fit the landmark detector's noise into unrealistic deformations.",
    skills: ["Computer Vision", "Python"],
    paperUrl: "/pdfs/3D Face Report.pdf",
    blogSlug: "fitting-a-face-and-optimizing-a-noisy-target",
  },
]
