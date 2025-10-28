import dbConnect from "@/lib/dbConnect";
import Report from "@/lib/models/Report";

export default async function ReportPage({ params }) {
  const { id } = await params;

  await dbConnect();
  const report = await Report.findById(id).lean();

  if (!report) {
    return (
      <div className="p-10 text-center text-red-500">
        Report not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-4">
      <h1 className="text-3xl font-bold mb-6 text-indigo-700 text-center">
        Your Career Kundali 🔮
      </h1>

      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-3xl space-y-6">
        {/* Career Analysis */}
        <section>
          <h2 className="text-xl font-semibold mb-2">Career Analysis</h2>
          <div className="bg-gray-100 p-4 rounded-md space-y-2">
            <p>
              <strong>Skills:</strong>{" "}
              {Array.isArray(report.analysis?.skills)
                ? report.analysis.skills.join(", ")
                : "No data available"}
            </p>

            <p>
              <strong>Roles:</strong>{" "}
              {Array.isArray(report.analysis?.roles)
                ? report.analysis.roles.join(", ")
                : "No data available"}
            </p>

            <p>
              <strong>Education:</strong>{" "}
              {Array.isArray(report.analysis?.education)
                ? report.analysis.education.join(", ")
                : "No data available"}
            </p>

            <p>
              <strong>Achievements:</strong>{" "}
              {Array.isArray(report.analysis?.achievements)
                ? report.analysis.achievements.join(", ")
                : "No data available"}
            </p>
          </div>
        </section>

        {/* Career Prediction */}
        <section>
          <h2 className="text-xl font-semibold mb-2">Career Prediction</h2>
          <div className="bg-gray-100 p-4 rounded-md space-y-2">
            <p>
              <strong>Next Roles:</strong>{" "}
              {Array.isArray(report.prediction?.next_roles)
                ? report.prediction.next_roles.join(", ")
                : "No data available"}
            </p>

            <p>
              <strong>Growth Score:</strong>{" "}
              {report.prediction?.growth_score ?? "No data available"}
            </p>

            <p>
              <strong>Skill Gaps:</strong>{" "}
              {Array.isArray(report.prediction?.skill_gaps)
                ? report.prediction.skill_gaps.join(", ")
                : "No data available"}
            </p>
          </div>
        </section>

        {/* Horoscope */}
        <section>
          <h2 className="text-xl font-semibold mb-2">Career Horoscope 🌟</h2>
          <div className="bg-gray-100 p-4 rounded-md whitespace-pre-wrap">
            {report.horoscope || "No horoscope available"}
          </div>
        </section>
      </div>
    </div>
  );
}
