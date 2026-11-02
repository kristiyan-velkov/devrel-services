import {
  compareQuantityLabel,
  formatEur,
  identity,
  includedInEveryPlan,
  planLines,
  planOrder,
  plans,
  quotes,
  TERM_MONTHS,
} from "@/data/proposal";

export function PlansPrintSheet() {
  return (
    <div id="plans-print" className="plans-print" aria-hidden="true">
      <p className="plans-print__kicker">
        {identity.company} · {identity.person}
      </p>
      <h1 className="plans-print__title">What is included — and what is not</h1>
      <p className="plans-print__lede">
        {identity.company} for {identity.counterparty} · {identity.termLong} · quantities for the full{" "}
        {TERM_MONTHS}-month term. Each plan includes the previous one. Plan 2 Growth is recommended.
        “Not included” means that plan does not contain the line.
      </p>

      <table>
        <thead>
          <tr>
            <th scope="col">What you get</th>
            {planOrder.map((id) => {
              const plan = plans.find((item) => item.id === id);
              const quote = quotes[id];
              return (
                <th key={id} scope="col">
                  <span>Plan {plan?.number}</span>
                  {plan?.name}
                  {plan?.recommended ? " · Recommended" : ""}
                  <em>{formatEur(quote.monthly)}/month</em>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {planLines.map((line) => (
            <tr key={line.id}>
              <th scope="row">{line.label}</th>
              {planOrder.map((id) => (
                <td key={id}>{compareQuantityLabel(line.id, line.quantities[id])}</td>
              ))}
            </tr>
          ))}
          {includedInEveryPlan.map((row) => (
            <tr key={row.label}>
              <th scope="row">{row.label}</th>
              {planOrder.map((id) => (
                <td key={id}>{row.value}</td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th scope="row">Price per month</th>
            {planOrder.map((id) => (
              <td key={id}>{formatEur(quotes[id].monthly)}</td>
            ))}
          </tr>
        </tfoot>
      </table>

      <p className="plans-print__note">
        Hackathon prize pools are provided by Bright Data and are not in the fee. Conference fees
        are fee-only. {identity.email}
      </p>
    </div>
  );
}
