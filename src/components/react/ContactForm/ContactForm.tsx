import { useContactForm } from './useContactForm';

const selectClassName =
  'flex h-11 w-full rounded-2xl border border-input bg-background px-4 py-2 text-sm text-foreground ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50';

const inputClassName =
  'flex h-11 w-full rounded-2xl border border-input bg-background px-4 py-2 text-sm text-foreground ring-offset-background transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50';

const projectTypes = [
  'Launch a new product or surface',
  'Redesign an existing product',
  'Rescue a delayed or brittle release',
  'Need a technical/product audit first',
];

const projectStages = [
  'Pre-launch',
  'In market but needs improvement',
  'Mid-build and losing momentum',
  'Post-launch and underperforming',
];

const budgetRanges = [
  'Under EUR 8k',
  'EUR 8k-15k',
  'EUR 15k-30k',
  'EUR 30k+',
];

const timelines = [
  'Need direction this week',
  'Starting within 2-4 weeks',
  'Starting within 1-2 months',
  'Exploring the right window',
];

export const ContactForm = () => {
  const { status, errorMessage, handleSubmit, resetStatus } = useContactForm();

  return (
    <div className="overflow-hidden rounded-[2rem] border border-border/70 bg-surface/92">
      {status === 'success' ? (
        <div className="px-6 py-12 md:px-8 md:py-14">
          <div className="max-w-xl">
            <p className="text-[0.72rem] font-medium uppercase tracking-[0.24em] text-muted-foreground">
              Inquiry received
            </p>
            <h3 className="mt-4 font-display text-[2.4rem] leading-[0.96] tracking-[-0.05em] text-foreground">
              Thanks. I will review the brief and reply with the right next step.
            </h3>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Expect a response within 1-2 business days. If the scope looks like a fit, I will reply with
              direction, availability, and how we should structure the conversation.
            </p>
            <button
              onClick={resetStatus}
              className="mt-8 inline-flex min-h-11 items-center justify-center rounded-full border border-border/80 px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-accent"
            >
              Submit another brief
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="px-6 py-7 md:px-8 md:py-8">
          <div className="border-b border-border/70 pb-6">
            <p className="text-[0.72rem] font-medium uppercase tracking-[0.24em] text-muted-foreground">
              Project brief
            </p>
            <h3 className="mt-4 font-display text-[2rem] leading-tight tracking-[-0.045em] text-foreground md:text-[2.5rem]">
              Share enough context for a serious first reply.
            </h3>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
              The goal is not a long intake form. It is enough signal to understand the problem, the stage,
              and whether the scope should be framed as a launch, redesign, or rescue engagement.
            </p>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-foreground">
                Name
              </label>
              <input required name="name" type="text" id="name" className={inputClassName} placeholder="Your name" />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-foreground">
                Email
              </label>
              <input required name="email" type="email" id="email" className={inputClassName} placeholder="name@company.com" />
            </div>
            <div className="space-y-2">
              <label htmlFor="companyOrTeam" className="text-sm font-medium text-foreground">
                Company or team
              </label>
              <input
                required
                name="companyOrTeam"
                type="text"
                id="companyOrTeam"
                className={inputClassName}
                placeholder="Company, product, or team name"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="websiteOrProductUrl" className="text-sm font-medium text-foreground">
                Website or product URL
              </label>
              <input
                name="websiteOrProductUrl"
                type="url"
                id="websiteOrProductUrl"
                className={inputClassName}
                placeholder="https://..."
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="projectType" className="text-sm font-medium text-foreground">
                Project type
              </label>
              <select required name="projectType" id="projectType" className={selectClassName} defaultValue="">
                <option value="" disabled>
                  Select the closest fit
                </option>
                {projectTypes.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label htmlFor="projectStage" className="text-sm font-medium text-foreground">
                Current stage
              </label>
              <select required name="projectStage" id="projectStage" className={selectClassName} defaultValue="">
                <option value="" disabled>
                  Select the current stage
                </option>
                {projectStages.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label htmlFor="budgetRange" className="text-sm font-medium text-foreground">
                Budget range
              </label>
              <select required name="budgetRange" id="budgetRange" className={selectClassName} defaultValue="">
                <option value="" disabled>
                  Select the likely range
                </option>
                {budgetRanges.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label htmlFor="timeline" className="text-sm font-medium text-foreground">
                Timeline
              </label>
              <select required name="timeline" id="timeline" className={selectClassName} defaultValue="">
                <option value="" disabled>
                  Select the timing
                </option>
                {timelines.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-4 space-y-2">
            <label htmlFor="message" className="text-sm font-medium text-foreground">
              What needs to change?
            </label>
            <textarea
              required
              name="message"
              id="message"
              rows={7}
              className="flex w-full rounded-[1.5rem] border border-input bg-background px-4 py-3 text-sm text-foreground ring-offset-background transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Describe the product, what is not working yet, what the deadline is, and what would make this engagement successful."
            ></textarea>
          </div>

          {status === 'error' && (
            <div className="mt-4 rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-600">
              {errorMessage}
            </div>
          )}

          <div className="mt-6 flex flex-col gap-4 border-t border-border/70 pt-6 md:flex-row md:items-center md:justify-between">
            <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
              Best for funded launches, meaningful redesigns, and rescue scopes where the product surface matters commercially.
            </p>
            <button
              type="submit"
              disabled={status === 'loading'}
              className="inline-flex min-h-11 items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed"
            >
              {status === 'loading' ? 'Sending brief...' : 'Send project brief'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
