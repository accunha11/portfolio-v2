export type BlogItem = {
  slug: string
  title: string
  subtitle: string
  category: "Research" | "University Project"
  summary: string
  details: string
  skills: string[]
  githubUrl?: string
  paperUrl?: string
}

export const blogItems: BlogItem[] = [
  {
    slug: "where-an-llms-reasoning-matters-a-negative-result",
    title: "Where an LLM's Reasoning Matters: A Negative Result Worth Reporting",
    subtitle:
      "Testing a reward-densification signal with interventions before letting it near an RL run",
    category: "Research",
    summary:
      "Disagreement between a model and a weakened copy of itself does not mark the steps that decide the answer. It marks local fragility instead, and the difference matters for any attribution method.",
    details: `Take a strong model, make a weaker copy of it, and watch where the two disagree. The tokens where the weak copy would have written something else are the ones that needed the capacity it lost. If those are also the tokens that decide whether the final answer is right, you get a dense per-token training signal out of a single pass-or-fail reward, with no human step labels and no learned reward model.

We spent the semester testing that premise. It does not hold. Across three interventions on MATH-500, positions where the two models disagreed had no more influence on the final answer than matched positions where they agreed: McNemar p = 1.00 on the paired test, Fisher p = 0.80 at the step level.

The tempting move is to bolt the signal onto a GRPO objective and watch the reward curve. But a training run tangles the signal up with the learning rate, the advantage normalization, the KL penalty and everything else, and it burns a lot of compute to teach you very little. We collapsed the framework into one claim we could break instead: disagreement positions have more leverage on correctness than depth-matched positions where the models agree. Then we attacked it three ways, each harder than the last. Hand generation to the weak model partway through a solution. Flip a single token and let the strong model carry on. Corrupt a whole reasoning step and see whether it recovers.

Most of the work went into the controls. Depth turned out to dominate everything: release the weak model in the last quarter of a solution and it finishes correctly about 70 percent of the time, release it in the first quarter and it essentially never does. Without matching on depth we would have measured that and called it a discovery. Entropy is the other trap. Disagreements cluster where the strong model is already unsure, 0.41 nats against 0.08 at controls, and entropy-based token selection is the obvious single-model baseline any two-model signal has to beat, so every comparison is adjusted for it. We spliced in the strong model's own second-choice token to keep the damage equivalent across arms, and we released only at the five most confident disagreements per solution. That last choice stacks the deck toward the hypothesis on purpose, so a null result is harder to wave away.

One effect did survive. Perturbing at a disagreement position disrupts the next few tokens far more than perturbing elsewhere, 2.55 against 1.60 nats per token, and roughly two thirds of that gap remains after adjusting for entropy. It just never reaches the answer: the same perturbation moves the final answer's probability by about 0.001 nats in every arm. The signal is real, and it is local. It finds where the missing capacity was doing its work, which is mostly fluency and confidence at awkward positions, rather than where the answer is won or lost. Hard for a weaker model and load-bearing for the outcome are simply different properties. In distillation the first one is the whole point, which is why related divergence signals work well there. It does not carry over.

Characterizing the weakened model taught me something I keep reusing. On MMLU it looked usable far below full capacity, still scoring 0.42 against a 0.25 chance baseline at the most aggressive compression. Ask it to actually generate at that setting and it loops on the same phrase until the budget runs out. Likelihood ranking and free generation are not the same test, and the wrong one will cheerfully report that a broken model is healthy. We mapped where that cliff sits and ran every intervention just above it, where disagreement covers 12.3 percent of tokens instead of the 44 percent of noise below.

What the null licenses is worth stating precisely. Binary outcome metrics are not powerful, and ours could only have caught a difference of around 11 percentage points, so a modest effect would have slipped past. The regression treats positions as independent when they are nested inside 23 rollouts, which makes t = 2.35 an upper bound on the evidence rather than a clean reading. And all of this concerns top-1 disagreement, greedy decoding, one model, on problems that model already solves. Graded measures like KL or Jensen-Shannon divergence are still open.

The result I did not go looking for is that corrupting an entire reasoning step left the final answer intact 84 percent of the time. These chains are far more redundant than the credit-assignment framing assumes. Most steps are not load-bearing at all, and finding the few that are will take more than a capacity difference. That is the thread I would pull next. The infrastructure survives the negative result either way: one decomposition run yields the same model at any capacity you like, which is a useful thing to own when the question is what a network's extra capacity is actually for.`,
    skills: [
      "Machine Learning & AI",
      "Model Evaluation",
      "Reasoning & Reliability",
      "Python",
    ],
    paperUrl: "/pdfs/Master-Novice Reward Densification.pdf",
  },
  {
    slug: "sparse-autoencoders-on-a-genome-model",
    title: "Sparse Autoencoders on a Genome Model, and Why I Shuffle Modalities Now",
    subtitle:
      "Unsupervised features that track transcription factors, and a control that exposed what AUROC could not see",
    category: "University Project",
    summary:
      "Sparse autoencoders recovered transcription factor structure from a DNA model without labels, and a shuffled-modality ablation exposed cross-modal signal that the headline metric could not see.",
    details: `Two things from this project stuck with me, and neither is the number we put on the leaderboard. The first: a sparse autoencoder trained on a DNA language model, with no binding labels anywhere in its objective, produced features that pick out transcription factor binding on held-out genes, at a median best-feature AUROC of 0.659 across 164 factors. The second: when we fed our cross-modal model the wrong protein, AUROC barely moved while average precision fell by half.

Transcription factors switch genes on and off by binding particular stretches of promoter DNA. The maps of where they bind come from ChIP experiments, which are expensive, condition-specific and missing for most factors in most species, so a method that needs those labels only solves the easy half of the problem. BindingBench asks for methods that work without them, which turns the task into a question about representation. How much regulatory structure does a genome model already carry, and can you read it out?

We borrowed the answer from language model interpretability. A TopK sparse autoencoder on SpeciesLM embeddings, 768 dimensions expanded to 6144 latents with 32 active at any position, trained on reconstruction alone. Then for each factor we chose its single best latent on a training split and scored that latent on held-out genes. High-occupancy factors like abf1 and hap5 came out strongest. I would describe the result carefully, though. Picking the best feature per factor after the fact means you need to know which factor you are looking for, so what we showed is that separable features exist inside the representation, not that the model contains a binding-site detector you could deploy. The gap between the information being present and the model having a usable module is something I have become fussy about since.

The conditioning is the part I would most like to build on. Instead of gluing a protein vector onto a DNA vector, we used FiLM: the protein embedding produces scale and shift parameters that modulate a frozen DNA encoder, so the factor's identity changes how the sequence gets read rather than sitting next to it. Against late fusion it won on AUROC, 0.858 to 0.835, and tied on average precision, 0.0107 to 0.0106. From that table alone you would shrug and conclude the fusion strategy hardly matters.

Then we shuffled the proteins, so every promoter was conditioned on some other factor's identity. AUROC went from 0.858 to 0.832, near enough to noise. Average precision went from 0.0107 to 0.0059. The protein pathway was carrying real, factor-specific information and the headline metric could barely see it. Binding sites are vanishingly rare among candidate positions, and with imbalance that severe, AUROC is dominated by the enormous pool of easy negatives while average precision lives where the model has to commit. I now run the shuffle by default on anything with a second input. Whether a model genuinely uses a modality or is coasting on the dominant one is not a question an aggregate score will answer.

None of which makes any of these models useful yet. Average precision hovered around 0.01 across the board, and the classical baselines are not a courtesy: STREME and JASPAR with FIMO come out of decades of work on sequence motifs and stay interpretable in a way a dilated convolutional stack never will. In earlier projects my baseline was a smaller version of my own model. Here it came from a different field entirely and beating it was not a given, which is what got me interested in hybrids that keep the motif prior instead of replacing it.

Leakage in biology also has an unfamiliar shape, following identity and homology rather than rows in a table. We held out whole genes so that a feature could not be scored on the sequence it was chosen from, and whole factors to test generalization to ones never seen. We also had to admit the comparison was not perfectly matched, since runtime limits meant the autoencoder exports used lower peak caps than the supervised models.

What pulled me toward biology is that the failures here are hypotheses. Our best guess for why protein conditioning underperforms is that mean-pooling an ESM-DBP embedding smears out the DNA-binding domain, which is the part that actually determines specificity, and that anisotropy in the embedding space blurs whatever survives. That is a representation problem with obvious next moves: pull out the domain-specific subsequence, or drop the pooling and let the DNA encoder attend to the protein directly. It is also the question I find most interesting in multimodal models generally, which is how to put two separately trained encoders into one space without the conditioning signal collapsing into a generic prior. Doing that where the ground truth is a mechanism rather than a preference label is the part I would like to keep.`,
    skills: [
      "Machine Learning & AI",
      "Computational Biology",
      "Model Evaluation",
      "Python",
    ],
    paperUrl: "/pdfs/BindingBench Presentation.pdf",
  },
  {
    slug: "a-healthbench-score-measures-three-things",
    title: "A HealthBench Score Measures Three Things, Not One",
    subtitle:
      "Prompt strategy and judge identity moved medical benchmark conclusions as much as the model under test",
    category: "Research",
    summary:
      "Changing the prompt reordered which model looked best, and swapping the judge model shifted scores far more than rewording the judge instruction. The number describes a model, a prompt, and an evaluator together.",
    details: `On HealthBench, which model looked best depended on the prompt. Under baseline instructions one model led. With prompts optimized per model, two others passed it. No weights changed in between. A benchmark table built on one fixed prompt is partly ranking how well each model suits that prompt, and a reader has no way to pull that apart from medical skill.

HealthBench invites the problem by being open-ended. Rather than multiple-choice items, it scores free-text answers to around 5,000 realistic healthcare conversations against rubrics written by physicians, so more than one answer can legitimately earn credit. The realism is the point, and it is also where the degrees of freedom come from. A system instruction changes structure, hedging and safety behavior. A judge then has to decide whether a half-satisfied rubric item counts.

We compared five hand-written strategies against Cost-Aware Prompt Optimization, an automated search that mutates and recombines prompts under a budget. Safety-first beat baseline everywhere, and forcing brevity was reliably the worst. Read the rubrics and that stops being mysterious, since they credit disclaimers, escalation advice and explanation, so an instruction to be concise mostly deletes things the model would have been paid for. The finding I liked most is not in the scores at all. All three optimized prompts, searched separately per model from different seeds, landed on safety-first language about patient safety, epistemic limits and referral. Independent searches converging on the same behavior is evidence that the search is finding rubric alignment rather than a lucky phrasing.

The judge experiments generalize furthest. We changed one thing at a time: fix the judge model and vary the grading instruction, then fix the instruction and vary the model. Across prompt variants the pairwise correlations held between roughly 0.71 and 0.80. Across models they dropped to somewhere between 0.12 and 0.60. Who grades mattered considerably more than how the grading was worded. We looked at correlation rather than agreement in means, since the question for model selection is whether the relative ordering survives, not whether two evaluators happen to average out the same. My guess is that judges diverge most on the borderline, partially satisfied items, which in open-ended medical answers is most of them.

The weakness in our own headline number is worth saying out loud. During the search, candidate prompts were graded by the model that had produced the answers, which keeps the budget manageable and introduces self-preference, while the manual strategies were graded externally. Those two sets of scores are not points on one scale and should not be read as if they were. Rerunning the optimized prompts under the external judge is the obvious next experiment.

There is also a claim this work cannot support, and it matters more here than in most domains. Prompt optimization does not give a model medical knowledge. It changes how existing capability comes out, measured against a rubric that stands in for clinical quality rather than being it. The prompt with the best HealthBench score is not therefore the safest one to deploy, and none of this says anything about patient outcomes.

The piece I would rebuild first is the dull one. Our pipeline keeps generation and scoring apart, stores responses as JSONL, resumes after interruptions and runs local judges through vLLM alongside API models. Because the answers sit on disk independent of any evaluator, re-scoring them under a different judge costs a single scoring pass. That is the difference between robustness analysis you recommend in a discussion section and robustness analysis you actually run. The harder version is what I would like to work on: designing open-ended evaluations, including multimodal ones, whose conclusions do not depend on which judge you happened to pick.`,
    skills: [
      "LLM Systems",
      "Model Evaluation",
      "Reasoning & Reliability",
      "Python",
    ],
    paperUrl: "/pdfs/Prompt Optimization in Medical LLM Benchmarks.pdf",
  },
  {
    slug: "oversmoothing-is-a-training-dynamics-failure",
    title: "Oversmoothing Is a Training Dynamics Failure, Not an Architectural One",
    subtitle:
      "Reproducing untrained GNN tickets, then designing the comparison that separates sparsity from optimization",
    category: "Research",
    summary:
      "Sparse networks collapse with depth if their weights train, and stay stable past 20 layers if they do not. Running the configuration nobody publishes is what isolates optimization as the cause.",
    details: `Deep graph networks stop working past five to eight layers. Node embeddings drift toward one another until nothing is distinguishable, and the standard explanation is architectural: message passing multiplies by a propagation operator over and over, that operator is a low-pass filter, so depth smooths. The explanation is incomplete. Sparse networks whose weights are never trained use exactly the same operators and stay stable out to 20 layers. Something other than the operator is doing the damage.

I started by reproducing Untrained GNN Tickets across three architectures and three citation datasets, sweeping depth from 2 to 20 layers. In that setup the weights stay random and frozen forever, and the only thing learned is a binary mask over connections. It held up. Dense trained models fell apart with depth while the untrained sparse ones did not, and on a 32-layer network the Mean Average Distance diagnostic showed dense embeddings collapsing to near-zero pairwise distance within a few layers while the frozen version kept its spread. The reproduction was not a formality. It gave me a baseline I trusted enough to argue against later.

Then the confound. Untrained tickets differ from dense models in two ways at once: they are sparse, and they never train. Most descriptions of the result credit the sparsity, but with only those two configurations the two properties move together and neither can be blamed. The missing case is a model that is sparse and still trained, which is what Unified Graph Sparsification gives you, learning masks over weights and edges with the gradients still flowing. It collapses with depth much like the dense model does. That one comparison settles the question, and sparsity is not what saves the untrained networks.

So is training itself fatal to depth, or only training left unconstrained? Weight reparameterization suggests the second. Building the effective weights from the covariance of the propagated features, whitening them in effect, keeps representations diverse while training proceeds normally, and it survives depths where dense training died long ago. I ran it against a version that applies the same transform once at initialization, which helped very little. The two differ only in whether the correction keeps being applied, so the failure lives in the trajectory rather than the starting point.

The result I did not expect was that the two fixes do not stack. Applying the structured initialization to the untrained tickets made them much worse. Mask learning appears to need a high-entropy random basis to select from, and structuring that pool leaves less to find. The two methods avoid collapse by different and partly incompatible routes: one refuses to train the weights at all, the other reshapes how they move. I could have left the experiment out for a cleaner story, but it is the part that says something about mechanism.

One smaller finding came from reading code rather than papers. Edge-Popup ranks connections by the absolute value of their learned scores. I tried the raw signed scores instead and got better results at lower sparsity, which hints that the sign carries expressivity the absolute value throws away.

This was a course-scale study on citation graphs, with most conclusions read off accuracy-versus-depth curves and a single smoothness diagnostic, not a theorem about representation rank. What I took from it is narrower and more portable. When two properties are entangled in every published configuration, go run the one nobody ran. And watch the geometry of the representation rather than only the accuracy, since collapse shows up in embedding distances well before the score notices. Depth-induced collapse is not a graph-specific disease, and asking what a network's capacity does to its representations led fairly directly to the work I did afterward on deliberately weakened language models.`,
    skills: ["Machine Learning & AI", "Model Evaluation", "Python"],
    githubUrl: "https://github.com/accunha11/practical-gnn",
    paperUrl: "/pdfs/Oversmoothing Report.pdf",
  },
  {
    slug: "guardrails-bound-the-damage-not-the-capability-gap",
    title: "Guardrails Bound the Damage, They Do Not Close the Capability Gap",
    subtitle:
      "Holding an LLM-to-SQL harness fixed and swapping the model turned a design belief into a measurement",
    category: "University Project",
    summary:
      "Inside one fixed pipeline, weaker models ran over 180 seconds with error rates above 80 percent while a stronger one answered in 45 seconds with none. Good orchestration made failures safe, not rare.",
    details: `I built this system believing that careful orchestration could carry a weaker model. Then I benchmarked it. With the pipeline held fixed and only the model swapped, the three local models took over 180 seconds per query, failed on more than 80 percent of them, and answered correctly somewhere between 6 and 13 percent of the time. A stronger hosted model, given the same schema grounding, the same validation and the same retry logic, came back in about 45 seconds with no errors and 87.5 percent accuracy.

The database holds tool condition monitoring data at TUM's Institute for Machine Tools and Industrial Management: sensor traces, wear measurements and process parameters from milling experiments. Engineers who knew exactly what they wanted still had to know the schema and write SQL to get it. What separates this from a demo is that the data sits next to production, where a confident wrong answer is worse than no answer and an unsafe write is not fixed by apologizing.

So the model never simply writes a query and runs it. The pipeline breaks into stages: decide whether the question concerns the database at all, fold in conversation context, pick candidate tables by relevance to the schema, generate SQL against only those tables, validate it, execute it read-only, retry within a fixed budget on recoverable errors, then summarize. Not for elegance. A single opaque call fails as one undifferentiated event, while stages let you point at the transition that broke and log it there. Nearly everything I learned about this system came from being able to ask which stage.

Grounding did most of the work against hallucination by shrinking the space in which the model could be wrong. We extracted the schema, tables and columns and foreign keys, in both machine-readable and human-readable form, then used it to narrow the prompt, hint at joins and allowlist what a query was permitted to touch. Invented columns and impossible joins dropped sharply. The cost is a dependency: answer quality now tracks metadata quality, and when the schema changes the grounding has to be regenerated or the system quietly starts reasoning about a database that no longer exists.

The safety layer taught me a distinction I use constantly now. An instruction is not a guarantee. Asking a model for read-only queries is a request it can fail under unusual phrasing. Validating the statement, rejecting writes and suspicious patterns, allowlisting schema elements and running inside a read-only transaction with a timeout are enforcement, and they hold whatever the model emits.

Which is why the benchmark result is clarifying rather than embarrassing. The safeguards decided whether failures were safe and legible. The model decided whether there were failures. I had been treating those as one property. A system can be well built, in the sense that nothing dangerous executes and every error is attributable, and still be unusable because the model underneath cannot write correct SQL fast enough.

The numbers deserve their caveats. Accuracy came from a modest set of representative queries with some manual review, so 87.5 percent is a model-selection signal inside this project rather than a figure worth quoting elsewhere, and retrieval was structured schema selection rather than vector search, which bounds what the system can answer at all. What stayed with me is the habit of building the harness that can tell me whether I am looking at the model or at my own code. I needed that same separation later, when the question was whether a benchmark score moved because of the model or because of the judge.`,
    skills: [
      "LLM Systems",
      "RAG",
      "Reasoning & Reliability",
      "LangGraph",
      "SQL",
      "Python",
    ],
    paperUrl: "/pdfs/NL2SQL Report.pdf",
  },
  {
    slug: "fitting-a-face-and-optimizing-a-noisy-target",
    title: "Fitting a Face, and Learning When to Stop Optimizing a Noisy Target",
    subtitle:
      "Analysis-by-synthesis, verification at every stage, and a failure mode I have now met in three different fields",
    category: "University Project",
    summary:
      "Optimizing past convergence made faces worse, because the solver began fitting the landmark detector's errors instead of facial geometry. The same failure shape appears whenever you optimize an imperfect target.",
    details: `Optimizing longer made the faces worse. That is the part of this project I still think about.

We were fitting a parametric face model to a single photograph by minimizing the distance between the model's projected landmarks and 68 landmarks found by a detector. Those detected points are estimates, and they carry error. Past a certain point the solver runs out of real geometry to explain and starts explaining the detector's mistakes instead, which lowers the loss and deforms the face. Early stopping and L2 regularization on the identity and expression coefficients were not tuning. They were a statement about how far to trust the target relative to the prior.

The setup is analysis-by-synthesis, which I have kept as a way of thinking. A morphable model is a generative prior over faces, a mean shape plus PCA bases, where 300 identity coefficients and 100 expression coefficients synthesize a specific face. Reconstruction becomes inference over those coefficients, with the regularization weights scaled by the PCA variances so the answer stays in plausible territory. You are not learning a mapping from image to geometry. You are taking something that can generate faces and fitting it to the evidence.

We refused to treat it as one large optimization. Model inspection, landmark detection, semantic correspondence, pose initialization, shape and expression fitting, texture, export, and every stage produced an artifact you could look at. Meshes exported for inspection in 3D software. Debug images from the detector. Correspondences tagged with their semantic names, so a point claiming to be the nose tip had to prove it. This matters more in an inverse problem than in ordinary software, because an upstream mistake does not crash anything. It produces a wrong answer that looks entirely reasonable.

Two stages carried more weight than their size suggests. Correspondence, because if the 2D landmarks map to the wrong vertices the optimizer will faithfully fit the wrong face. And initialization, which we solved in two steps, rotation from a Perspective-n-Point solve and then scale and translation under a weak perspective camera. Once the wireframe locked onto the jaw, nose bridge, eyes and mouth, everything downstream behaved. In a non-convex fit the initialization chooses which basin you land in.

We also wrote our own projection and gradients rather than handing everything to a solver library. It cost time and bought control: numerical stability, and the ability to enforce constraints like keeping vertices in front of the camera and bounding the coefficients. I would not make that trade every time, but when the failures are geometric and you diagnose them by looking, owning the projection math helps.

The evidence is qualitative, and I would rather say so than let a nice render imply otherwise. We projected the wireframe back onto the photograph and judged the alignment, and the report centers on the rigid pose stage. There is no geometric error measured against ground-truth scans, so the claim is that pose recovery is visually verified for both face models, not that reconstruction accuracy has been established. Occlusion and unusual poses degrade the landmarks, and everything downstream follows from there.

Mostly this project handed me the noisy-target lesson early, and it keeps coming back. A solver fitting detector error here. A prompt search optimizing a rubric that stands in for clinical quality later. A reward signal standing in for which reasoning steps mattered after that. The optimizer is always faithful to the target you give it, so the question worth asking is rarely whether the loss went down. It is whether the target still means what you think it means by the time you stop.`,
    skills: ["Computer Vision", "Python"],
    paperUrl: "/pdfs/3D Face Report.pdf",
  },
]
