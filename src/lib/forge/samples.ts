import type { Sample } from "./types";

export const SAMPLES: Sample[] = [
  {
    id: "conversation-forge",
    title: "Conversation → skill",
    blurb: "A long chat that kept circling one question: how do you package a whole thread into an operating manual, not a summary.",
    hint: "Reusable depth over recency. Preserve exact wording. Pick the highest-leverage skill, not the last topic.",
    transcript: `USER: I keep having these long working sessions with you and then the value evaporates. Next week I start from zero. I don't want a summary. Summaries are dead on arrival. I want something a future agent can EXECUTE.

ASSISTANT: You want a playbook, not minutes. What would "execute" mean — a checklist, a prompt, a skill file?

USER: A skill.md. Complete. Not a stub. If I handed it to a stranger-agent they could do the job without this chat. And stop optimizing for the last message. The last message is usually a small edit. The conversation is the actual product.

ASSISTANT: Got it. Capture street-level artifacts exactly, then step back and ask what the thread was really about.

USER: Yes. Two levels at once. Street-level: prompts, templates, constraints, examples, decisions — keep the wording. High-level: the pattern underneath. People keep packaging the obvious topic and missing the capability.

ASSISTANT: Example?

USER: Last month we spent four hours designing a hiring scorecard, then I asked you to "make the PDF prettier." If you package "PDF layout" you burned the gold. The gold was the scorecard logic, the disqualify rules, the interview loop. The PDF was a render.

ASSISTANT: So the selection rule is: most reusable, highest leverage, faithful to the full arc — not the last ask.

USER: Exactly. And if there are two strong skills, ship both, or a parent with sub-skills. Don't collapse them into a mushy mega-doc.

ASSISTANT: Process I'm hearing:
1. Reconstruct the arc — start, real problem, pivots, artifacts, what they kept optimizing for.
2. List candidate skills, including non-obvious ones.
3. Choose.
4. Preserve gold exactly.
5. Extract how they think and turn it into hard rules.

USER: That's the process. Make it non-negotiable. Also an execution contract: first a file list table (path | purpose). Then every listed file at full production depth. Zero stubs. Then one verification line that the files match the list. No preamble.

ASSISTANT: Output format?

USER: I need it machine-parseable later, but the human contract is: File List, then complete skill.md files, then verification. If the first pass is weak, a redo is not a paraphrase — it is the unlock. Full-depth dump.

ASSISTANT: What does "how they think" mean in the skill?

USER: Look at what they punish. I punish fluff, recency bias, lost templates, unverified output, and skills that can't be run. Turn those into decision rules. "Do not summarize. Do not pick the last topic. Preserve exact prompts. Verify the file list matches."

ASSISTANT: Any path convention?

USER: skills/<slug>/SKILL.md. Sub-skills nested if needed. YAML frontmatter with name + description. The body is an operating manual: when to use, when not, procedure, decision rules, templates, anti-patterns, verification.

ASSISTANT: Anti-patterns?

USER: Packaging the last request. Summarizing instead of instructing. Dropping the user's exact prompt because you "cleaned it up." Writing a blog post. Leaving TODOs. One vague skill that tries to cover five jobs.

USER: Also: street-level means if we wrote a template in the chat, it goes into the skill verbatim. I don't want a "similar" template. I want THAT template.

ASSISTANT: I'll treat any reusable block as sacred text.

USER: Good. One more: the conversation may look like we were "just building an app" or "just fixing copy." Ignore the costume. Ask what reusable capability was being trained. That's the skill.

ASSISTANT: So the meta-skill is: reread the whole thread at two altitudes, choose the highest-leverage capability, and forge a complete operating manual a future agent can run.

USER: Yes. Call the move Mass Artifact Forge. Locked. Zero deviation.`,
  },
  {
    id: "design-critique",
    title: "Design critique loop",
    blurb: "A product designer hammering a UI from generic AI-looking to a real system — tokens, anti-slop, concentric radii.",
    hint: "Systems over one-off styling. Ban the tells of generic AI UI. One accent, real hierarchy, verification by eye.",
    transcript: `USER: The dashboard looks like every AI dashboard. Purple gradient, Inter, rounded-xl cards, emoji headers. I need it to look like a product someone paid for.

ASSISTANT: What would "paid for" mean in your mouth?

USER: Intentional. Calm. Expensive. Near-black field, one restrained accent, not purple. Display + body pairing. Hairline borders. No blob gradients. No emoji as icons.

ASSISTANT: I can restyle the page.

USER: Don't restyle the page. Install a system, then compose. Tokens in CSS first: bg, surface, fg, muted, primary, border, radius scale, motion. If a value isn't a token, it doesn't ship.

ASSISTANT: Palette?

USER: Dark iron #0a0a0b, elevated #121214, bone text #f0efe9, muted #8e8e89, accent cool steel — never gold, never purple. Accent is for primary actions and focus, not every card.

USER: Radius is concentric. Outer = inner + padding. If the button is 8 and the card pads 16, the card is 24. Same radius on parent and child is a fail.

ASSISTANT: Motion?

USER: 150–250ms, opacity + transform, open slower than close. Never transition: all. Respect reduced motion. Don't bounce everything.

USER: Anti-slop checklist is law:
- No gradient-blob heroes
- No emoji in chrome
- No Inter-only hierarchy
- No purple/violet/magenta/gold fills
- No glassmorphism soup
- Every element earns its place

ASSISTANT: How do we know it's done?

USER: Not a 200 OK. Open it. Desktop and mobile. If text is white-on-white, if the tap target is 28px, if the empty state is a blank hole — it's not done. Loading, empty, and error are designed states.

USER: Copy tone: short, plain, verbs. Continue, Forge, Copy, Download. No "✨ magic".

ASSISTANT: Components?

USER: Prefer a real primitive kit for buttons, dialogs, inputs. Don't invent a second visual language. Match tokens. 44px targets on mobile. No horizontal overflow at 390.

USER: We spent an hour arguing about a chart color and then I said "make the tooltip nicer." If you package "tooltip polish" you missed it. The skill is how to run a design system install under anti-slop constraints.

ASSISTANT: So the reusable capability is: define tokens, ban slop tells, compose from the system, verify by eye on real viewports.

USER: Yes. And write the checklist into the skill so a future agent cannot "tastefully" reintroduce purple.`,
  },
  {
    id: "hiring-scorecard",
    title: "Hiring scorecard OS",
    blurb: "A founder building a hiring loop, then asking for a prettier PDF. The PDF is a costume. The loop is the product.",
    hint: "Disqualify rules and scorecard logic over document cosmetics. Keep the exact rubric language.",
    transcript: `USER: We're hiring a founding generalist. I need a scorecard. Not vibes. If two of us interview, I want the same spine.

ASSISTANT: What must be true in 90 days for this hire to have been right?

USER: They have shipped something customers touched, unblocked themselves in our messy repo, and I would let them talk to a user without me in the room.

ASSISTANT: Draft scorecard dimensions?

USER: Four only. If we have twelve, we have none.
1. Shipped judgment — did they pick the useful 20%?
2. Agency — did they move without a ticket nanny?
3. Communication density — short, specific, no fog
4. Taste — can they tell when it's still generic

USER: Scoring: 1-4, no 3s as a hiding place. 1 = disqualify signal, 2 = below bar, 3 is banned, 4 = bar, 5 = we'd learn from them. Wait. Use 1, 2, 4, 5. Kill the middle.

ASSISTANT: Disqualifiers?

USER: Hard no, any one is enough:
- Blames "the process" for no artifacts
- Cannot walk a decision they made; only recites a stack
- Contempt for users or for unglamorous work
- Needs a perfect spec to start

USER: Interview loop:
1. Work sample — 90 minutes, a real ugly problem from our backlog, not a leetcode. We pay them.
2. Decision walk — they bring one thing they shipped and we spend 40 minutes on the forks they didn't take.
3. Pair — 45 minutes in our actual repo.
4. Founder close — values and pace, not selling.

USER: Rubric language I want kept exactly:

SHIPPED JUDGMENT
5: Cut scope that would have impressed peers and shipped the customer-visible core.
4: Sequenced work so a user could touch it this week.
2: Polished the wrong surface.
1: Optimized for looking busy.

AGENCY
5: Found the blocked path, named it, moved a different path the same day.
4: Unblocked themselves with a specific ask.
2: Waited.
1: Narrated blockers as identity.

USER: Calibration rule: if the panel's scores disagree by more than one allowed bucket, you don't average. You reopen the evidence. Averaging is how we hire the middle.

ASSISTANT: I can put this in a nice one-pager.

USER: Later. First lock the operating system. The PDF is a render. If we argue about type size before disqualify rules, we are doing fashion.

ASSISTANT: Offer bar?

USER: Offer only if no hard disqualifier AND at least two dimensions at 4+ AND nobody on the panel is privately hoping someone else will veto.

USER: After we locked that, I asked you to "make the PDF prettier." Do not package typography. Package the hiring OS. Future-me will try to skip disqualifiers under time pressure — the skill must forbid that.

ASSISTANT: Verification: a loop is correct if a new interviewer can run it from the doc alone, scores are comparable, and a pretty PDF cannot be produced before the rubric exists.

USER: Yes. Write it so they cannot "just hop on a vibe call."`,
  },
];
