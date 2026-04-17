export type BlogItem = {
  slug: string
  title: string
  subtitle: string
  category: "Research" | "Personal Project" | "University Project"
  summary: string
  details: string
  skills: string[]
  githubUrl?: string
  paperUrl?: string
}

export const blogItems: BlogItem[] = [
  {
    slug: "my-first-big-gnn-research-project",
    title: "My First Big GNN Research Project: Lessons from Oversmoothing",
    subtitle: "How this project shaped the way I approach AI research",
    category: "Research",
    summary:
      "A reflection on reproducing and extending oversmoothing research in deep GNNs, and what I learned from close mentorship throughout the process.",
    details: `This oversmoothing project was my first major research experience in AI, and it was one of the most valuable learning experiences I’ve had so far. I went into it interested in graph neural networks, but I came out with a much deeper understanding of how to actually do effective research: define clear questions, reproduce baselines carefully, run controlled extensions, and document findings with discipline.

The core problem we studied was oversmoothing in deep GNNs — the tendency for node representations to become indistinguishable as depth increases. I started by reproducing key results from Untrained GNN Tickets (UGTs), then extended the analysis with additional methods like Unified Graph Sparsification (UGS), Weight Reparameterization (WeightRep), and initialization studies. Working through these comparisons helped me understand how to move from “interesting intuition” to evidence-backed conclusions.

One of the most important technical insights for me was that sparsity alone is not a complete fix. In our experiments, sparse models that still trained weights could collapse, while untrained sparse subnetworks remained stable much deeper. That contrast made the broader point very clear: oversmoothing is deeply tied to optimization dynamics, not only to architecture depth or graph structure.

Beyond the technical side, this project taught me how research actually gets done day to day. I had a supervisor I met with regularly, and those meetings were incredibly helpful. They guided me on how to frame hypotheses, design stronger experiments, and pressure-test interpretations before claiming conclusions. That mentorship made a huge difference in helping me develop better research habits and confidence.

I also learned to value reproducibility and diagnostic tooling. Tracking metrics like MAD, validating trends across datasets and architectures, and carefully comparing methods under consistent protocols were all essential. The process was sometimes slow, but it showed me that strong research is less about one flashy result and more about consistent, rigorous reasoning.

Overall, this project gave me both practical GNN depth and a foundation in research methodology. It confirmed that I genuinely enjoy research work, especially when it combines theory, experimentation, and iterative feedback from mentorship. As my first big research project, it set the standard for how I want to approach future AI research.`,
    skills: [
      "Machine Learning & AI",
      "Model Evaluation",
      "PyTorch",
      "Reasoning & Reliability",
    ],
    githubUrl: "https://github.com/accunha11/practical-gnn",
    paperUrl: "/pdfs/Oversmoothing Report.pdf",
  },
  {
    slug: "building-reliable-nl2sql-for-sensitive-industrial-data",
    title: "Building Reliable NL2SQL Systems for Sensitive Industrial Data",
    subtitle: "What this project taught me about reliability, safeguards, and trust",
    category: "University Project",
    summary:
      "A reflection on designing an LLM-based NL2SQL system where correctness and safety mattered as much as model capability.",
    details: `This project taught me that building AI systems for real-world engineering data is not just about getting a model to produce plausible answers. It is about building trust. In our NL2SQL system for tool condition monitoring data, reliability and safeguards were just as important as natural language quality.

The core goal was to let users query a PostgreSQL database in natural language, without requiring SQL expertise. But in an industrial setting, a wrong query or unsafe query can have serious consequences. So from the beginning, I approached the system as a reliability problem first: how do we make sure generated SQL is grounded, safe, and consistently useful?

A big design decision was to avoid a monolithic “ask model, run query” flow. Instead, I built a staged pipeline with explicit steps: request classification, context handling, schema-aware table selection, SQL generation, safety validation, read-only execution, bounded retries, and answer summarization. This separation made failure modes visible and gave us control points for quality and safety.

One of the most valuable lessons was how much schema grounding matters. By narrowing prompts to relevant tables, relationships, and allowed schema elements, we significantly reduced hallucinated columns and invalid joins. In practice, metadata quality became one of the strongest predictors of answer quality.

Protecting sensitive operational information also shaped many implementation decisions. The system validates SQL before execution, rejects non-read-only or suspicious patterns, executes inside read-only transactions with timeouts, and uses allowlisted schema context. These are not “extra features”; they are essential safeguards when AI interfaces touch production-adjacent data.

I also learned that reliability is deeply tied to evaluation discipline. We did not rely on a few demo prompts. We used unit and integration tests, representative ground-truth runs, and benchmark comparisons across model setups. That process made latency, error rates, and answer behavior measurable, and helped us make informed decisions about deployment trade-offs.

Another practical takeaway was that model quality and system quality are different things. Even strong models can fail without good orchestration and validation. Conversely, a carefully designed workflow can make model behavior far more stable and transparent. This project reinforced my belief that robust AI products come from strong system design around the model, not only model selection.

Overall, this was an important experience in building AI that is usable and safe at the same time. It strengthened how I think about reliability engineering for LLM applications, especially when working with sensitive data and domain-specific workflows where trust must be earned through design.`,
    skills: [
      "LLM Systems",
      "RAG",
      "Reasoning & Reliability",
      "LangGraph",
      "SQL",
    ],
    paperUrl: "/pdfs/NL2SQL Report.pdf",
  },
  {
    slug: "3d-face-reconstruction-learnings",
    title: "What Building a 3D Face Reconstruction Pipeline Taught Me",
    subtitle: "Reflections from a university computer vision project",
    category: "University Project",
    summary:
      "A behind-the-scenes look at how our team built a single-image 3D face reconstruction pipeline and what I learned from the process.",
    details: `For one of my recent university projects, my team and I built a pipeline to reconstruct a textured 3D face from a single RGB image using parametric face models (BFM and FLAME). On paper, it sounded straightforward: detect landmarks, estimate pose, fit parameters, texture the mesh. In practice, it was one of those projects where every stage taught us something new about debugging, modeling assumptions, and what “working” really means in computer vision.

One of the best decisions we made was treating this as a staged system rather than a single giant optimization problem. We split the work into clear modules: model inspection and landmark mapping, 2D landmark detection, pose initialization with PnP, shape/expression fitting, texture extraction, and rendering. That structure made the project much easier to reason about and gave us checkpoints whenever something broke.

The biggest early lesson was that landmark correspondence matters more than expected. Before optimization, we had to correctly map Dlib’s 68 landmarks to semantically meaningful 3D model points. If this mapping is wrong, everything downstream degrades. We spent a lot of time validating this stage with debug images and semantic overlays, and that visual verification step saved us repeatedly.

Pose estimation was the turning point. Once we got robust initial camera pose and could project a wireframe back onto the face with tight alignment around the jaw, nose, eyes, and mouth, the rest of the pipeline became much more stable. It reinforced a core lesson: good initialization is not optional in model fitting tasks.

During optimization, we minimized landmark reprojection error with regularization on identity and expression coefficients. Two things stood out: first, regularization was essential to keep outputs realistic; second, early stopping mattered a lot. If we optimized too long, the model started fitting landmark noise instead of real geometry and produced unrealistic deformations.

Another valuable takeaway was the trade-off between black-box tools and custom control. We used OpenCV where it made sense, but implementing parts of projection and fitting ourselves gave us better observability and stability controls. That made debugging much more practical when numerical behavior became unpredictable.

Overall, this project gave me a much deeper intuition for geometric vision pipelines. More than anything, it taught me that strong CV systems come from disciplined verification at every stage, not just a final visualization that looks good.`,
    skills: ["Machine Learning & AI", "Model Evaluation", "Python"],
    githubUrl: "https://github.com/Nils19/Face_Reconstruction",
    paperUrl: "/pdfs/3D Face Report.pdf",
  },
]
