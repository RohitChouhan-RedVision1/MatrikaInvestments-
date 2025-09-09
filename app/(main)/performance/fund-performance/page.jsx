import FundCategoryTabs from "@/components/FundCategoryTabs/page";
import RvBreadcrumbs from "@/components/landing/page-breadcrumbs/rvbreadcrumbs";

export default function MarketUpdate() {

  return (
    <div className="">
      <RvBreadcrumbs
        maintitle="Calulators"
      />
      <div className="py-10 px-4">
        <div className="max-w-screen-xl mx-auto main-section">
          <FundCategoryTabs />
        </div>
      </div>
    </div>
  );
}